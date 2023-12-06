const { transporter } = require("@config/nodemailer");
const showError = require("@utils/showError");
const path = require("path");

const sendEmail = async (toEmail, subject, body, text = false, attachments) => {
  try {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.GMAIL_SENDER,
      to: toEmail,
      subject: subject,
      text: text ? body : undefined,
      html: text ? undefined : body,
      attachments: attachments ? attachments : undefined,
    });
    return true
  } catch (error) {
    showError(error);
    return false
  }
};

module.exports = sendEmail;
