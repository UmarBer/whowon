const mongoose = require('mongoose');

const submitionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
});

const Submition = mongoose.model('Submition', submitionSchema);

module.exports = Submition;
