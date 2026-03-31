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
    const { email, full_name, source } = await req.json();

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
  <title>Welcome to Love &amp; Wellness</title>
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
              <h1 style="margin:0;color:#FAF6F1;font-size:26px;font-weight:400;line-height:1.4;">Welcome, ${first_name}</h1>
              <div style="width:48px;height:2px;background:#D4AF6A;margin:20px auto 0;"></div>
              <p style="margin:16px 0 0 0;color:#D4AF6A;font-size:14px;font-style:italic;line-height:1.6;">
                "The universal language is LOVE, and it begins from within."
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:48px 40px;">
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                You've just taken the first step toward the love you were born to have.
              </p>
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                Welcome to the Love &amp; Wellness community — a sacred space for women who are ready to stop settling and start living the deep, fulfilling love they truly deserve.
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- About Dr. Patricia -->
              <h2 style="margin:0 0 16px 0;color:#6B2D6B;font-size:18px;font-weight:600;letter-spacing:0.5px;">Meet Dr. Patricia George</h2>
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                Dr. Patricia George is a certified love and relationship coach who has guided hundreds of women to break through their patterns, heal from heartbreak, and attract the lasting love they truly desire. Her approach is warm, evidence-based, and deeply transformative — rooted in the belief that love is not something you find, but something you <em>become</em>.
              </p>
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                She has dedicated her life's work to one mission: helping you understand that the greatest love story you will ever live begins from within.
              </p>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- What You'll Receive -->
              <h2 style="margin:0 0 16px 0;color:#6B2D6B;font-size:18px;font-weight:600;letter-spacing:0.5px;">What You'll Receive</h2>
              <p style="margin:0 0 16px 0;color:#1A1025;font-size:16px;line-height:1.7;">As a member of this community, expect:</p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;"><strong>Inspiring insights</strong> to shift your mindset and open your heart</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;"><strong>Love coaching tips</strong> you can apply immediately in your life and relationships</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;"><strong>Exclusive invitations</strong> to trainings, masterclasses, and intimate events with Dr. Patricia</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- CTA -->
              <p style="margin:0 0 16px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                Ready to go deeper? Join Dr. Patricia for a free live training and experience her coaching firsthand. It could be the hour that changes everything.
              </p>
              <table cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td style="background:#6B2D6B;border-radius:4px;padding:14px 32px;text-align:center;">
                    <a href="https://www.loveandwellnesscoaching.com/webinar"
                       style="color:#D4AF6A;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:0.5px;display:block;">
                      Join Us for a Free Training &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:24px 0 0 0;color:#1A1025;font-size:16px;line-height:1.7;">
                With so much love,<br />
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
                You're receiving this because you signed up at
                <a href="https://www.loveandwellnesscoaching.com" style="color:#888;text-decoration:none;">loveandwellnesscoaching.com</a>.<br />
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
        subject: 'Welcome to Love & Wellness — your journey starts now',
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
