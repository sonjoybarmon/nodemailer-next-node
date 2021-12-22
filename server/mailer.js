// "use strict";
const nodemailer = require("nodemailer");

exports.sendConfirmationEmail = function ({ toUser, hash }) {
  console.log(toUser.email);
  return new Promise((res, rej) => {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GOOGLE_USER,
        pass: process.env.GOOGLE_PASSWORD,
      },
    });

    const message = {
      from: process.env.GOOGLE_USER,
      to: toUser.email,
      subject: "SREEIT - Confirm your email",

      html: `
       <h3> Hello ${toUser.username} </h3>
        <p>Thank you for registering into our Application. Much Appreciated! Just one last step is laying ahead of you...</p>
        <p>To activate your account please follow this link: <a target="_" href="${process.env.DOMAIN}/api/activate/user/${hash}">${process.env.DOMAIN}/activate </a></p>
        <p>SREE</p>
        <p>SREEIT Team</p>
      
      `,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        return rej(err);
      }
      return res(info);
    });
  });
};
