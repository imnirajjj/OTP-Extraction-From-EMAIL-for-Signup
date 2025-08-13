require('dotenv').config();
const MailosaurClient = require('mailosaur');

const mailosaur = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
const serverId = process.env.MAILOSAUR_SERVER_ID;

async function generateTestEmail() {
  const randomString = Math.random().toString(36).substring(2, 8);
  return `${randomString}@${serverId}.mailosaur.net`;
}

async function getOtpFromEmail(emailAddress) {
  const searchCriteria = { sentTo: emailAddress };

  // Wait for email (default timeout: 10s, you can increase)
  const email = await mailosaur.messages.get(serverId, searchCriteria, { timeout: 30000 });

  // Extract the first code from the email (HTML or text)
  if (email.html && email.html.codes && email.html.codes.length > 0) {
    return email.html.codes[0].value;
  }
  if (email.text && email.text.codes && email.text.codes.length > 0) {
    return email.text.codes[0].value;
  }
  throw new Error('OTP code not found in email.');
}

module.exports = { generateTestEmail, getOtpFromEmail };
