const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // use SSL
  port: 25,
  auth: {
    user: "StartupHub21@gmail.com",
    pass: "shub@2021",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
router.post("/", (req, res, next) => {
  let mailOptions = {
    from: "StartupHub21@gmail.com",
    to: "hirujayasuriya98@gmail.com",
    subject: "test 123",
    text: "yaaaaaaaaaaaaa" + req.body.code,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log("Email Sent");
    }
  });
});

module.exports = router;
