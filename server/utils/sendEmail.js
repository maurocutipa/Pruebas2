const { transporter } = require('@config/nodemailer')
const path = require('path')



const sendEmail = async (toEmail, body, text = false) => {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: process.env.GMAIL_SENDER,
    to: toEmail,
    subject: "Comprobante Denuncia",
    text: text ? body : undefined,
    html: text ? undefined : body,
    attachments: [
      {
        filename: 'example.pdf',
        path: path.join(__dirname, '../.cache/example.pdf'),
        contentType: 'application/pdf'
      }
    ]
  });

  //console.log("Message sent: %s", info.messageId);
}

module.exports = sendEmail