-- SUPABASE DATABASE SCHEMA for Love & Wellness Coaching

-- USERS (Extends auth.users implicitly, handled by triggers)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'member',  -- member | admin
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- LEADS (opt-in captures from webinars/funnels)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  source TEXT,  -- webinar | masterclass | organic | referral
  utm_source TEXT,
  utm_campaign TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  converted BOOLEAN DEFAULT FALSE
);

-- APPLICATIONS (VIP/Group coaching qualification)
CREATE TABLE IF NOT EXISTS public.applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  relationship_status TEXT,
  biggest_challenge TEXT,
  already_tried TEXT,
  commitment_level INT,  -- 1-10
  investment_comfort TEXT,
  referral_source TEXT,
  status TEXT DEFAULT 'pending',  -- pending | approved | not_a_fit | follow_up
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES public.profiles(id)
);

-- WEBINARS
CREATE TABLE IF NOT EXISTS public.webinars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  webinar_type TEXT,  -- daily | masterclass_friday
  scheduled_at TIMESTAMPTZ,
  duration_minutes INT DEFAULT 60,
  max_attendees INT,
  registration_url TEXT,
  replay_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- WEBINAR REGISTRATIONS
CREATE TABLE IF NOT EXISTS public.webinar_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  webinar_id UUID REFERENCES public.webinars(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  full_name TEXT,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  attended BOOLEAN DEFAULT FALSE,
  source TEXT
);

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  compare_price DECIMAL(10,2),
  images TEXT[],  -- array of image URLs
  category TEXT,  -- merch | wellness | digital | gift
  source TEXT,    -- alibaba | custom | digital
  alibaba_product_id TEXT,
  stock_quantity INT,
  is_active BOOLEAN DEFAULT TRUE,
  is_offer_stacked BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ORDERS
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  stripe_session_id TEXT,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending',  -- pending | paid | fulfilled | refunded
  order_type TEXT,  -- shop | vip_day | group_coaching | webinar
  items JSONB,  -- snapshot of order items
  shipping_address JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- DONATIONS
CREATE TABLE IF NOT EXISTS public.donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  donor_email TEXT,
  donor_name TEXT,
  amount DECIMAL(10,2) NOT NULL,
  stripe_payment_intent_id TEXT UNIQUE,
  message TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- POSTS (Blog)
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,  -- MDX/rich text
  cover_image TEXT,
  author_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger to create profile after Auth Signup
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinars ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webinar_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- SIMPLE RLS POLICIES

-- Profiles: Users can read and update their own profile. Admins can read/update all.
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Leads: Anyone can insert (since funnels are public forms). Admins manage.
CREATE POLICY "Public can insert leads" ON public.leads FOR INSERT WITH CHECK (true);

-- Applications: Anyone can insert. Admin manages.
CREATE POLICY "Public can insert applications" ON public.applications FOR INSERT WITH CHECK (true);

-- Webinars: Public can view active webinars.
CREATE POLICY "Public can view active webinars" ON public.webinars FOR SELECT USING (is_active = true);

-- Products: Public can view active products.
CREATE POLICY "Public can view active products" ON public.products FOR SELECT USING (is_active = true);

-- Posts: Public can view published posts.
CREATE POLICY "Public can view published posts" ON public.posts FOR SELECT USING (published = true);

-- Orders: Users can view their own orders.
CREATE POLICY "Users can view own orders" ON public.orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own orders" ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id OR user_id IS NULL);
