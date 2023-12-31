require("dotenv").config({ path: "../.env" });
const { createTransport } = require("nodemailer");


const sendMail = async (options) => {
  const transporter = createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.APP_PASSWORD,
    },
  });


  const message = {
    from: `${process.env.FROM_NAME}<${process.env.EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options?.text || undefined,
    html: options?.html || undefined,
  };

  let info = await transporter.sendMail(message);
  console.log(`Message send ${info.messageId}`);
};

module.exports = sendMail;