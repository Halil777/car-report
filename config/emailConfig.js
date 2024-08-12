const nodemailer = require("nodemailer");

// Replace these with your Gmail credentials
const EMAIL = "sendtomail777999@gmail.com";
const PASSWORD = "gpis rbuc rniv zhkd"; // Use app password if 2FA is enabled

// Configure Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

module.exports = transporter;
