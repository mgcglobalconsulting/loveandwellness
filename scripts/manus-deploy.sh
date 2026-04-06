#!/usr/bin/env bash
# =============================================================
# manus-deploy.sh — Pre-flight validation + production deploy
# Usage: ./scripts/manus-deploy.sh
# =============================================================

set -euo pipefail

echo ""
echo "=== Love & Wellness Coaching — Production Deploy ==="
echo ""

# ── Load .env.local if present (for local runs) ──────────────
if [ -f ".env.local" ]; then
  set -a
  source .env.local
  set +a
  echo "Loaded .env.local"
fi

# ── 1. Required env var validation ──────────────────────────
REQUIRED_VARS=(
  "NEXT_PUBLIC_SUPABASE_URL"
  "NEXT_PUBLIC_SUPABASE_ANON_KEY"
  "NEXT_PUBLIC_SITE_URL"
  "SUPABASE_SERVICE_ROLE_KEY"
  "STRIPE_SECRET_KEY"
  "STRIPE_WEBHOOK_SECRET"
  "STRIPE_PRICE_VIP_DAY"
  "STRIPE_PRICE_GROUP_COACHING"
  "STRIPE_PRICE_MASTERCLASS"
  "RESEND_API_KEY"
)

MISSING=()
for var in "${REQUIRED_VARS[@]}"; do
  if [ -z "${!var:-}" ]; then
    MISSING+=("$var")
  fi
done

if [ ${#MISSING[@]} -gt 0 ]; then
  echo "ERROR: Missing required environment variables:"
  for var in "${MISSING[@]}"; do
    echo "  - $var"
  done
  echo ""
  echo "Set them via: vercel env add <VAR_NAME> production"
  exit 1
fi

echo "Required env vars: OK"
echo ""

# ── 2. Supabase migrations ───────────────────────────────────
echo "Running Supabase database migrations..."
if command -v supabase &>/dev/null; then
  npx supabase db push
  echo "Migrations: OK"
else
  echo "WARN: supabase CLI not found — skipping db push"
  echo "      Install with: brew install supabase/tap/supabase"
fi
echo ""

# ── 3. Next.js build check ───────────────────────────────────
echo "Running next build..."
npm run build
echo "Build: OK"
echo ""

# ── 4. Deploy to Vercel production ───────────────────────────
echo "Deploying to Vercel production..."
npx vercel --prod

echo ""
echo "=== Deploy complete ==="
