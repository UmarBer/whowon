const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', routeGuard, (req, res, next) => {
  Question.create({
    year: '1992',
    winnerTeam: 'Juventus',
    loserTeam: 'Torino'
  })
    .then(() => {
      return Question.find({});
    })
    .then((questions) => {
      console.log(questions);
      res.render('questions', { questions });
    })
    .catch((error) => next(error));
});

module.exports = router;
