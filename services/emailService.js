const transporter = require("../config/emailConfig");

const sendEmail = async (to, subject, text) => {
  try {
    const info = await transporter.sendMail({
      from: transporter.options.auth.user,
      to: to,
      subject: subject,
      text: text,
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
