// Cloudflare Pages Function -- POST /api/retell-webhook
// Receives Retell's "call_analyzed" event (configured as the Agent Level
// Webhook URL in the Retell dashboard) and emails Julie the same way the
// text chatbot does, via the shared _notify.js helper.
//
// KNOWN SIMPLIFICATION (first iteration): does not yet verify the
// x-retell-signature header. Worst case of an unverified call is a spoofed
// notification email, not any real data exposure or write access -- low
// enough risk to defer until the basic flow is proven working end to end.
//
// KNOWN UNCERTAINTY: this is our first integration with Retell's webhook
// payload shape. The exact key holding custom Post Call Extraction fields
// (call.call_analysis.custom_analysis_data vs. call.call_analysis directly)
// is inferred from docs, not yet confirmed against a real payload. The full
// raw call_analysis object is logged below so the first real test call
// reveals the actual shape if this guess is wrong.

import { sendNotificationEmail } from './_notify.js';

export async function onRequestPost(context) {
  const { request, env } = context;

  let payload;
  try {
    payload = await request.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { event, call } = payload;

  // Only call_analyzed carries the extracted fields -- call_started and
  // call_ended do not, per Retell's docs.
  if (event !== 'call_analyzed') {
    return new Response(null, { status: 204 });
  }

  const analysis = call?.call_analysis || {};
  console.log('Retell call_analysis raw payload:', JSON.stringify(analysis));

  const fields = analysis.custom_analysis_data || analysis;

  const sessionType = fields.session_type || 'Not specified';
  const firstName = fields.first_name || '';
  const contactMethod = fields.contact_method || 'none given';
  const contactValue = fields.contact_value || '(not given)';
  const completedQuestionnaire = fields.completed_questionnaire === true;
  const questionnaireAnswers = fields.questionnaire_answers || '';
  const callSummary = fields.call_summary || analysis.call_summary || '';

  if (contactMethod === 'none given' && !completedQuestionnaire) {
    // No lead and no questionnaire -- caller just asked questions and hung
    // up. Nothing to notify Julie about.
    console.log('Retell call_analyzed with no lead/questionnaire data, skipping notification.');
    return new Response(null, { status: 204 });
  }

  const subject = completedQuestionnaire
    ? `Voice questionnaire completed: ${sessionType}${firstName ? ' - ' + firstName : ''}`
    : `New voice agent lead${firstName ? ': ' + firstName : ''}`;

  const text = [
    `${completedQuestionnaire ? 'Completed questionnaire' : 'New lead'} from the voice agent (${sessionType}).`,
    '',
    `Name: ${firstName || '(not given)'}`,
    `Contact (${contactMethod}): ${contactValue}`,
    callSummary ? `\nSummary: ${callSummary}` : '',
    questionnaireAnswers ? `\n${questionnaireAnswers}` : '',
    '',
    `Call ID: ${call?.call_id || 'unknown'}`,
  ]
    .filter(Boolean)
    .join('\n');

  await sendNotificationEmail(env, { subject, text });

  return new Response(null, { status: 204 });
}
