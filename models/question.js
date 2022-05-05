const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  year: String,
  options: [
    {
      type: String
    }
  ],
  correct: {
    type: String
  }
});

const Question = mongoose.model('Questions', questionsSchema);

module.exports = Question;
