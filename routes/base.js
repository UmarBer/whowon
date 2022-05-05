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
router.get('/game-over', routeGuard, (req, res, next) => {
  res.render('game-over');
});

module.exports = router;
