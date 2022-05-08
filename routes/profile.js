const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

router.get('/', routeGuard, (req, res, next) => {
  res.render('profile');
});

router.get('/create-question', routeGuard, (req, res, next) => {
  res.render('create-question');
});

router.get('/delete-question', routeGuard, (req, res, next) => {
  const userID = req.user._id;
  console.log(userID);
  Question.find({ createdBy: userID }).then((questionsID) => {
    console.log(questionsID);
    res.render('delete-question', { questionsID });
  });
});

router.get('/successful', routeGuard, (req, res, next) => {
  res.render('successful');
});

router.post('/success', (req, res, next) => {
  const competition = req.body.competition;
  const year = req.body.year;
  const options = [req.body.winner, req.body.loser];
  const correct = req.body.winner;
  const createdBy = req.user._id;
  Question.create({ competition, year, options, correct, createdBy })
    .then((newQuestion) => {
      res.redirect('/profile/successful');
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:id/delete-question', routeGuard, (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  Question.findByIdAndRemove(id)
    .then(() => {
      res.redirect('/profile/delete-question');
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
