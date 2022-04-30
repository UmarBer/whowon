'use strict';
const Questions = require('../models/question');
const express = require('express');
const router = express.Router();
const routeGuard = require('./../middleware/route-guard');

router.get('/', (req, res, next) => {
  res.render('home', { title: 'Hello World!' });
});

router.get('/private', routeGuard, (req, res, next) => {
  res.render('private');
});

// router.get('/questions', routeGuard, (req, res, next) => {
//   Questions.find({})
//     .then((questions) => {
//       console.log(req.body);
//       res.render('questions', { questions });
//     })
//     .catch((error) => next(error));
// });

module.exports = router;
