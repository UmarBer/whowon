const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const helpers = require('handlebars-helpers')();

router.get('/', routeGuard, (req, res, next) => {
  Question.find()
    .then((questions) => {
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      const randomPosition = Math.random();
      console.log(randomQuestion);
      console.log(randomPosition);
      res.render('questions', {
        randomQuestion,
        randomPosition: randomPosition > 0.5
      });
    })
    .catch((error) => next(error));
});

module.exports = router;
