// module dependencies
const express = require('express');
const authHelpers = require('../auth/auth-helpers');
const passport = require('../auth/local');

// create an express router
const router = express.Router();

// first calls 'authHelpers.loginRedirect' if user already login
// this function is defined in /auth/auth-helpers.js
// else if user not login yet, next() is returned, which is (req, res) => {res.render('auth/register')}
router.get('/register', authHelpers.loginRedirect, (req, res)=> {
  // render /views/auth/register.ejs to sign up for new user
  res.render('auth/register');
});

// this is coming from /views/auth/register.ejs form for new user
router.post('/register', (req, res, next)  => {
  // this create new user function is coming from /auth/auth-helpers.js
  return authHelpers.createUser(req, res)
  .then((response) => {
    console.log('registration successful');
  })
  .catch((err) => { res.status(500).json({ status: 'error' }); });
});

// this function is defined in /auth/auth-helpers.js
// GET method of REST API, which is Read of CRUD
// just render the login page
router.get('/login', authHelpers.loginRedirect, (req, res)=> {
  res.render('auth/login');
});

// this is where the POST method of REST API
// this is where authenicaton happens once user enter his/her credentails
// goes to auth/local.js for passport.authenticate function
// if succesful, goes to /views/user/index.ejs
// if failed, goes to /views/auth/login which askes to login again
router.post('/login', passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/auth/login',
    failureFlash: true
  })
);

// prob. using Express logout method, not passport
// pretty straightforward, logouts users, and renders the root
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
