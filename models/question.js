const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
  year: String,
  winnerTeam: String,
  loserTeam: String
});

const Question = mongoose.model('Questions', questionsSchema);

module.exports = Question;
