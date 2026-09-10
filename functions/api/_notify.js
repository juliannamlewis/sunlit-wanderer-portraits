// Shared Resend email helper, used by both the text chatbot (chat.js) and
// the Retell voice agent webhook (retell-webhook.js), so both channels
// notify Julie the same way through one tested code path.

export async function sendNotificationEmail(env, { subject, text }) {
  if (!env.RESEND_API_KEY || !env.LEAD_NOTIFY_EMAIL || !env.LEAD_FROM_EMAIL) {
    console.log('Notification captured but email not configured yet:', subject, text);
    return;
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      from: env.LEAD_FROM_EMAIL,
      to: env.LEAD_NOTIFY_EMAIL,
      subject,
      text,
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    console.error(`Resend API error ${res.status}:`, body);
  } else {
    console.log(`Notification email sent successfully. subject="${subject}" response=${body}`);
  }
}
