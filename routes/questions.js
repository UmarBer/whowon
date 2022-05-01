const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const helpers = require('handlebars-helpers')();
const Submition = require('../models/submition_create');
const User = require('./authentication');

let count = 0;
router.get('/', routeGuard, (req, res, next) => {
  Question.find()
    .then((questions) => {
      const randomQuestion =
        questions[Math.floor(Math.random() * questions.length)];
      const randomPosition = Math.random();
      console.log(randomQuestion);
      console.log(randomPosition);
      console.log(req.session.userId);
      res.render('questions', {
        randomQuestion,
        randomPosition: randomPosition > 0.5
      });
    })

    .catch((error) => next(error));
});

// router.post('/', routeGuard, (req, res, next) => {
//   const questionId = req.body;
//   console.log(questionId);
//   // Question.find()
//   //   .then((questions) => {
//   //     const randomQuestion =
//   //       questions[Math.floor(Math.random() * questions.length)];
//   //     const randomPosition = Math.random();
//   //     console.log(randomQuestion);
//   //     console.log(randomPosition);
//   //     res.render('questions', {
//   //       randomQuestion,
//   //       randomPosition: randomPosition > 0.5
//   //     });
//   //   })

//   //   .catch((error) => next(error));
// });

module.exports = router;
