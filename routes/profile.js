const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');
const res = require('express/lib/response');

router.get('/', routeGuard, (req, res, next) => {
  res.render('profile');
});

router.get('/create-question', routeGuard, (req, res, next) => {
  res.render('create-question');
});

router.get('/successful', routeGuard, (req, res, next) => {
  res.render('successful');
});

router.post('/success', (req, res, next) => {
  const competition = req.body.competition;
  const year = req.body.year;
  const options = [req.body.winner, req.body.loser];
  const correct = req.body.winner;
  Question.create({ competition, year, options, correct })
    .then((newQuestion) => {
      res.redirect('/profile/successful');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
