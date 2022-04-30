const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  Question.find()
    .then((questions) => {
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      console.log(randomQuestion);
      res.render('questions', { randomQuestion });
    })
    .catch((error) => next(error));
});

module.exports = router;
