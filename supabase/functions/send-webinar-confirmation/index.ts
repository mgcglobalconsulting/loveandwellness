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
    const { email, full_name, webinar_type, webinar_title } = await req.json();

    const first_name = full_name ? full_name.split(' ')[0] : 'Beautiful Soul';
    const isMasterclass = webinar_type === 'masterclass_friday';

    const subject = isMasterclass
      ? `You're IN for the Masterclass Party — Here's what to know`
      : `You're registered! Your Love & Wellness Training Details`;

    const typeLabel = isMasterclass ? 'Friday Masterclass Party' : 'Daily Love Training';

    const typeDescription = isMasterclass
      ? 'This is an intimate, exclusive Friday evening masterclass — a curated experience designed to go deep. Only 20 seats are available, and yours is now reserved.'
      : 'This is a live, interactive daily training with Dr. Patricia George — open-hearted, practical, and deeply transformative.';

    const detailBlock = isMasterclass
      ? `<p style="margin:0 0 12px 0;color:#1A1025;font-size:16px;line-height:1.7;">
           <strong style="color:#6B2D6B;">When:</strong> Friday evening, 7–10 PM EST
         </p>
         <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
           This is an intimate experience — only 20 seats. Because of the exclusive nature of the Masterclass Party, we ask that you arrive on time and come fully prepared to engage.
         </p>`
      : `<p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
           The training runs approximately <strong>60–90 minutes</strong>. Bring a notebook and an open heart — you'll want to capture what comes through for you.
         </p>`;

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${subject}</title>
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
              <h1 style="margin:0;color:#FAF6F1;font-size:26px;font-weight:400;line-height:1.4;">You're Confirmed, ${first_name}!</h1>
              <div style="width:48px;height:2px;background:#D4AF6A;margin:20px auto 0;"></div>
              <p style="margin:16px 0 0 0;color:#D4AF6A;font-size:14px;font-style:italic;">
                ${typeLabel}
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#ffffff;padding:48px 40px;">
              <p style="margin:0 0 24px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                Your spot is officially reserved. We are so glad you're joining us — this is exactly where you're supposed to be.
              </p>

              <!-- Event Details Box -->
              <table cellpadding="0" cellspacing="0" width="100%" style="background:#FAF6F1;border-left:4px solid #D4AF6A;margin:0 0 32px 0;">
                <tr>
                  <td style="padding:24px 28px;">
                    <h2 style="margin:0 0 16px 0;color:#6B2D6B;font-size:17px;font-weight:600;letter-spacing:0.5px;">Your Event Details</h2>
                    <p style="margin:0 0 12px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                      <strong style="color:#6B2D6B;">Event:</strong> ${webinar_title || typeLabel}
                    </p>
                    <p style="margin:0 0 12px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                      <strong style="color:#6B2D6B;">Type:</strong> ${typeDescription}
                    </p>
                    ${detailBlock}
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- Preparation Tips -->
              <h2 style="margin:0 0 16px 0;color:#6B2D6B;font-size:18px;font-weight:600;letter-spacing:0.5px;">How to Prepare</h2>
              <p style="margin:0 0 16px 0;color:#1A1025;font-size:16px;line-height:1.7;">
                To get the most out of your experience, here's how to set yourself up:
              </p>
              <table cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;">Find a <strong>quiet, private space</strong> where you can be fully present without interruption.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;">Grab your <strong>favorite beverage</strong> — tea, water, something that feels like a ritual.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;">Have a <strong>notebook and pen</strong> nearby — insights will come, and you'll want to capture them.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding:8px 0;">
                    <table cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="color:#D4AF6A;font-size:18px;vertical-align:top;padding-right:12px;line-height:1;">&#9670;</td>
                        <td style="color:#1A1025;font-size:15px;line-height:1.7;">Come <strong>ready to transform</strong> — show up with an open heart and a willingness to go deep.</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Divider -->
              <div style="border-top:1px solid #D4AF6A;margin:32px 0;"></div>

              <!-- Calendar Reminder -->
              <table cellpadding="0" cellspacing="0" width="100%" style="background:#FAF6F1;border-radius:4px;margin:0 0 32px 0;">
                <tr>
                  <td style="padding:20px 24px;text-align:center;">
                    <p style="margin:0 0 6px 0;color:#6B2D6B;font-size:14px;font-weight:600;letter-spacing:1px;text-transform:uppercase;">Don't Forget</p>
                    <p style="margin:0;color:#1A1025;font-size:15px;line-height:1.6;">
                      Add this event to your calendar now so you don't miss a moment. Block the time, set a reminder, and treat it as the sacred appointment it is.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 0 0;color:#1A1025;font-size:16px;line-height:1.7;">
                We cannot wait to see you there.<br /><br />
                With love,<br />
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
        subject,
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
