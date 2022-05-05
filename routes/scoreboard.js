const express = require('express');
const Question = require('../models/question');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');
const User = require('../models/user');

router.get('/', (req, res, next) => {
  User.find({})
    .limit(10)
    .sort({ highScore: -1 })
    .then((users) => {
      res.render('scoreboard', { users });
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
