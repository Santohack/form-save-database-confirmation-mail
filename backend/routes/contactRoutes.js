const express = require('express');
const router = express.Router();
const Contact = require('../models/contactModel');

router.post('/', async (req, res) => {
  try {
    const { userName, email, mobile, message, offer } = req.body;

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
