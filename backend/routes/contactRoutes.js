const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
  
    user: process.env.SMTP_MAIL,
    pass: process.env.SMTP_PASS,
  },
});
router.post('/', async (req, res) => {
  try {
    const { userName, email, mobile, message, offer } = req.body;
    console.log(userName, email, mobile, message, offer)

    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'New Contact Form Submission',
      text: `Name: ${userName}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}\nOffer: ${JSON.stringify(offer)}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    })
    // Create a new instance of your Contact model
    const newContact = new Contact({ userName, email, mobile, message, offer });

    // Save the data to MongoDB
    await newContact.save();

    res.status(201).json({ message: 'Data saved to MongoDB' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
