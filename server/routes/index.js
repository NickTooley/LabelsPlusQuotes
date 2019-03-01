const express = require('express');
const CustomerModel = require('../models/CustomerModel');
const passport = require('passport');
const QuoteModel = require('../models/QuoteModel');

const router = express.Router();

var schedule = require('node-schedule');
var j = schedule.scheduleJob('*/1 * * * *', async function(){//run every hour when minute = 1
    var dt = new Date();
    dt.setDate( dt.getDate() );
    const quotes = await QuoteModel.find({date: {$lt: dt} ,status: 'Pending'});
    console.log("Next Cycle");
    quotes.forEach(element => {
      console.log(element.quoteNum);
    });
    
});

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
