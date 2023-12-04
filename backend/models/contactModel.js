const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String },
  message: { type: String },
  offer: {
    reason: { type: String },
    currency: { type: String },
    amount: { type: String }
  }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
