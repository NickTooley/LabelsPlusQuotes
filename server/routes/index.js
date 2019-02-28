const express = require('express');
const CustomerModel = require('../models/CustomerModel');
const passport = require('passport');

const router = express.Router();

// Require the index file
const speakersRoute = require('./speakers');
const feedbackRoute = require('./feedback');
const usersRoute = require('./users');
const quotesRoute = require('./quotes');

function redirectIfLoggedIn(req, res, next) {
  if(!req.user) { return res.redirect('/users/login')}
  return next();
}

module.exports = (params) => {
  // Destructuring assignment
  const { speakers } = params;

  // Now let's define the index route and mount it on slash.
  router.get('/', redirectIfLoggedIn, async (req, res) => {
    const customers = await CustomerModel.find();
    return res.render('index', { page: 'Home', customers });
  });

  // And mount it to the path speakers.
  router.use('/users', usersRoute(params));
  router.use('/quotes', quotesRoute(params));
  return router;
};
