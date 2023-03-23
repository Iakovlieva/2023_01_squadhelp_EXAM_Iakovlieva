const nodemailer = require('nodemailer');
const CONSTANTS = require('../constants');
const NotFound = require('../errors/UserNotFoundError');

module.exports.sendingMail= async( recipient, subject,  text ) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: CONSTANTS.MAIL_ACCOUNT,
          pass: CONSTANTS.MAIL_PASSWORD,
        },
      });
  
      let mailOptions = {
        from: CONSTANTS.MAIL_ACCOUNT,
        to: recipient,
        subject,
        text,
      };
  
      await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new NotFound(`Can't send email`);
    }
  }