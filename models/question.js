const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  competition: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  options: [
    {
      type: String,
      required: true
    }
  ],
  correct: {
    type: String,
    required: true
  },
  createdBy: {
    type: String
  }
});

const Question = mongoose.model('Questions', questionsSchema);

module.exports = Question;
