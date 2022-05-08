const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const helpers = require('handlebars-helpers')();
const Question = require('../models/question');
const User = require('../models/user');
const Badge = require('../models/badge');

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
      const option1 = randomQuestion.options[0];
      const option2 = randomQuestion.options[1];
      console.log(option1);
      console.log(option2);
      Badge.find({ teamLogo: [option1, option2] }).then((badges) => {
        const randomOptions = Math.floor(Math.random() * 100);
        console.log(randomOptions);
        console.log(randomQuestion.options);
        console.log(badges);

        if (randomQuestion.options[0] === badges[0].teamLogo) {
        } else {
          badges.reverse();
        }
        if (randomOptions > 50) {
          randomQuestion.options.reverse();
          badges.reverse();
          console.log(randomQuestion.options);
          console.log(badges);
        }
        let badgeImg = badges[0].teamURL;
        let badgeImg2 = badges[1].teamURL;
        res.render('questions', {
          randomQuestion,
          id: randomQuestion._id,
          badgeImg,
          badgeImg2
        });
      });
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/:questionId/answer/', routeGuard, (req, res, next) => {
  const answerValue = req.body.answer;
  const { questionId } = req.params;
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
