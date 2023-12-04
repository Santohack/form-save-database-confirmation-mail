const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');
const OfferResponse = require('../models/offerResponseModel');
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

    // Create a new instance of your Contact model
    const newContact = new Contact({ userName, email, mobile, message, offer });

    // Save the data to MongoDB
    const savedContact = await newContact.save();
    const formId = savedContact._id;

    // Generate the form link
    const formLink = `http://localhost:3000/form/${formId}`;
   // Email content
    var mailOptions = {
      from: process.env.SMTP_MAIL,
      to: email,
      subject: 'Verification Email',
      text: `Please verify your Message\nName: ${userName}\nEmail: ${email}\nMobile: ${mobile}\nMessage: ${message}\nOffer: ${JSON.stringify(offer)}\nClick on the verification link to submit response: ${formLink}`,
    };
// Send the email
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



// Route for fetching form details by ID
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


// Route for handling user response
router.post('/response-user/:id', async (req, res) => {
  try {
    const { response } = req.body; // Check if the response is a string ("Yes" or "No")
    const formId = req.params.id;

    // Fetch the original form details from MongoDB
    const originalFormData = await Contact.findById(formId);
    if (!originalFormData) {
      return res.status(404).json({ error: 'Original form details not found' });
    }
    const formLink = `http://localhost:3000/formResponse/${formId}`; // Generating the form link
    // Email content with original form details and user's response
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: process.env.SMTP_MAIL, // Email to which the response with details will be sent
      subject: 'User Response with Form Details',
      text: `Original Form Details:\nName: ${originalFormData.userName}\nEmail: ${originalFormData.email}\nMobile: ${originalFormData.mobile}\nMessage: ${originalFormData.message}\nOffer: ${JSON.stringify(originalFormData.offer)}\n\nUser's Response: ${response}\n\nForm Link: ${formLink}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error sending user response email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json({ message: 'User response with details sent' });
      }
    });
  } catch (err) {
    console.error('Error handling user response:', err);
    res.status(500).json({ error: 'Error handling user response' });
  }
});

// Route for handling user responses to offers
router.post('/response/:id', async (req, res) => {
  try {
    const { response } = req.body; // Assuming the response is a string ("Yes" or "No")
    const formId = req.params.id;
    const formLink = `http://localhost:3000/formResponse/${formId}`;

    // Check if an offer already exists for the specified form ID
    let offerResponse = await OfferResponse.findOne({ originalForm: formId });

    // If an offer exists, update it; otherwise, create a new one
    if (offerResponse) {
      offerResponse.accepted = response === 'Yes';
      offerResponse.counterOffer = response === 'No' ? 'Counter offer details here' : '';
    } else {
      offerResponse = new OfferResponse({
        originalForm: formId,
        accepted: response === 'Yes',
        counterOffer: response === 'No' ? 'Counter offer details here' : '',
      });
    }

    // Save/update the offer response in the database
    await offerResponse.save();

    // Fetch the original form details from MongoDB
    const originalFormData = await Contact.findById(formId);
    if (!originalFormData) {
      return res.status(404).json({ error: 'Original form details not found' });
    }

    // Email content with original form details and user's response
    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: originalFormData.email, // Email to which the response with details will be sent
      subject: 'OfferConfirmation',
      text: `Original Form Details:\nName: ${originalFormData.userName}\nEmail: ${originalFormData.email}\nMobile: ${originalFormData.mobile}\nMessage: ${originalFormData.message}\nOffer: ${JSON.stringify(originalFormData.offer)}\n\nAccepted: ${response}`,
    };

    // Send the email
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.status(500).json({ error: 'Error sending user response email' });
      } else {
        console.log('Email sent: ' + info.response);
        res.status(201).json({ message: 'User response with details sent' });
      }
    });
  } catch (err) {
    console.error('Error handling user response:', err);
    res.status(500).json({ error: 'Error handling user response' });
  }
});

module.exports = router;
