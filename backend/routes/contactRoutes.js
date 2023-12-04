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
// router.post('/', async (req, res) => {
//   try {
//     const { userName, email, mobile, message, offer } = req.body;
//     console.log(userName, email, mobile, message, offer)
//      // Create a new instance of your Contact model
//     const newContact = new Contact({ userName, email, mobile, message, offer });
    
//     // Save the data to MongoDB
//     const savedContact = await newContact.save();
//     const formId = savedContact._id;
//     var mailOptions = {
//       from: process.env.SMTP_MAIL,
//       to: email,
//       subject: 'New Contact Form Submission',
//       text: `Name: ${userName}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}\nOffer: ${JSON.stringify(offer)}\nForm Link: ${formLink}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
//     });

   

//     res.status(201).json({ message: 'Data saved to MongoDB', formLink });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
router.post('/', async (req, res) => {
  try {
    const { userName, email, mobile, message, offer } = req.body;
    
    // Create a new instance of your Contact model
    const newContact = new Contact({ userName, email, mobile, message, offer });
    
    // Save the data to MongoDB
    const savedContact = await newContact.save();
    const formId = savedContact._id;

    // Generate the form link
    const formLink = `http://localhost:3000/form/${formId}`;
    
    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'New Contact Form Submission',
      text: `Name: ${userName}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}\nOffer: ${JSON.stringify(offer)}\nForm Link: ${formLink}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.status(201).json({ message: 'Data saved to MongoDB', formLink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// Assuming you have a route for fetching form details by ID
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ error: 'Form details not found' });
    }
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
