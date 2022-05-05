const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const helpers = require('handlebars-helpers')();
const User = require('../models/user');

router.get('/', routeGuard, (req, res, next) => {
  const idsOfQuestionsInCurrentStreak = req.user.questionsAnsweredCorrectly;
  const queryFilter = { _id: { $nin: idsOfQuestionsInCurrentStreak } };
  Question.count(queryFilter)
    .then((total) => {
      // If total was 100, random index will be 0-99, integer
      const randomIndex = Math.floor(Math.random() * total);
      return Question.findOne(queryFilter).skip(randomIndex);
    })
    .then((randomQuestion) => {
      console.log(randomQuestion._id);
      res.render('questions', {
        randomQuestion,
        id: randomQuestion._id
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:questionId/answer/', routeGuard, (req, res, next) => {
  console.log(req.body.answer);
  const answerValue = req.body.answer;
  console.log(req.params);
  const { questionId } = req.params;
  console.log(questionId);
  Question.findById(questionId)
    .then((question) => {
      if (question.correct === answerValue) {
        const newHighScore =
          req.user.questionsAnsweredCorrectly.length === req.user.highScore
            ? req.user.highScore + 1
            : req.user.highScore;
        return User.findByIdAndUpdate(
          req.user._id,
          {
            $push: { questionsAnsweredCorrectly: questionId },
            highScore: newHighScore
          },
          { new: true }
        );
      } else {
        return User.findByIdAndUpdate(
          req.user._id,
          { questionsAnsweredCorrectly: [] },
          { new: true }
        );
      }
    })
    .then((user) => {
      if (user.questionsAnsweredCorrectly.length) {
        res.redirect('/questions');
      } else {
        res.redirect('/game-over');
      }
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
