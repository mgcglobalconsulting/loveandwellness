import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { application } = await req.json();
    const { full_name, email, biggest_challenge, commitment_level } = application;

    const first_name = full_name ? full_name.split(' ')[0] : 'Beautiful Soul';

    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');

    if (!RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not found. Defaulting to success for logging purposes.");
      return new Response(JSON.stringify({ success: true, message: "Mock email sent" }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Application Received</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF6F1;font-family:Arial,Helvetica,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6F1;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#6B2D6B 0%,#0D0A14 100%);padding:48px 40px;text-align:center;border-radius:8px 8px 0 0;">
              <p style="margin:0 0 8px 0;color:#D4AF6A;font-size:13px;letter-spacing:3px;text-transform:uppercase;">Love &amp; Wellness Coaching</p>
              <h1 style="margin:0;color:#FAF6F1;font-size:26px;font-weight:400;line-height:1.4;">We Received Your Application</h1>
              <div style="width:48px;height:2px;background:#D4AF6A;margin:20px auto 0;"></div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:48px 40px;">
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                Dear ${first_name},
              </p>
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                Thank you for taking this courageous step. Choosing to invest in your love life — in <em>yourself</em> — is one of the most powerful decisions you will ever make, and Dr. Patricia George honors you for it.
              </p>
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                We have received your application and are so grateful you trusted us with your story.
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- What Happens Next -->
              <h2 style="margin:0 0 16px 0;color:#6B2D6B;font-size:18px;font-weight:600;letter-spacing:0.5px;">What Happens Next</h2>
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                Dr. Patricia personally reviews every application. If you are a strong fit, you will receive an email within <strong>2–3 business days</strong> with your next steps to move forward. Please check your inbox (and your spam folder, just in case).
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- VIP Day Bullets -->
              <h2 style="margin:0 0 16px 0;color:#6B2D6B;font-size:18px;font-weight:600;letter-spacing:0.5px;">What Your VIP Day Includes</h2>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:10px 0 10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;"><strong>A full day of deep, sacred 1-on-1 coaching</strong> with Dr. Patricia — devoted entirely to you and your love journey.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0 10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;"><strong>Breakthrough clarity on your patterns, blocks, and desires</strong> — so you can stop repeating the past and step into the relationship you were born for.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0 10px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;"><strong>A personalized roadmap and action plan</strong> — a clear, loving path forward you can walk with confidence from day one.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- CTA -->
              <p style="margin:0 0 16px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                In the meantime, if you haven't already, we warmly invite you to join us for our daily training. It's a beautiful first step into Dr. Patricia's world — and into yours.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td style="background:#6B2D6B;border-radius:4px;padding:14px 32px;text-align:center;">
                    <a href="https://www.loveandwellnesscoaching.com/webinar"
                       style="color:#D4AF6A;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.5px;display:block;">
                      Join the Daily Training &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0 0;color:#1A1025;font-size:16px;line-height:1.7;">
                With love and anticipation,<br />
                <strong style="color:#6B2D6B;">Dr. Patricia George</strong><br />
                <span style="color:#888;font-size:14px;">Love &amp; Wellness Coaching</span>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0D0A14;padding:28px 40px;text-align:center;border-radius:0 0 8px 8px;">
              <p style="margin:0 0 8px 0;color:#D4AF6A;font-size:12px;letter-spacing:2px;text-transform:uppercase;">Love &amp; Wellness Coaching</p>
              <p style="margin:0;color:#888;font-size:12px;line-height:1.6;">
                "The universal language is LOVE, and it begins from within."<br />
                <a href="https://www.loveandwellnesscoaching.com" style="color:#888;text-decoration:none;">loveandwellnesscoaching.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim();

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Dr. Patricia George <patricia@loveandwellnesscoaching.com>',
        to: email,
        subject: `We received your application, ${first_name} — here's what happens next`,
        html,
      })
    });

    if (!res.ok) {
      throw new Error(await res.text());
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });

  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
