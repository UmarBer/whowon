'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  passwordHashAndSalt: {
    type: String
  },
  highScore: {
    type: Number,
    default: 0,
    required: true
  },
  questionsAnsweredCorrectly: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    }
  ]
});

const User = mongoose.model('User', schema);

module.exports = User;
