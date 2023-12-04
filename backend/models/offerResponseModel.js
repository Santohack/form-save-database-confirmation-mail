const mongoose = require('mongoose');

const offerResponseSchema = new mongoose.Schema({
  originalForm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contact',
    required: true,
  },
  accepted: {
    type: Boolean,
    default: false,
  },
  counterOffer: {
    type: String,
    default: '',
  },
});

const OfferResponse = mongoose.model('OfferResponse', offerResponseSchema);

module.exports = OfferResponse;
