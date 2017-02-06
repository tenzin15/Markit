// module dependencies
const express = require('express');
const authHelpers = require('../auth/auth-helpers');
// create an express router
const router = express.Router();

/* GET user profile page. */
// add route here
router.get('/', authHelpers.loginRequired, (req, res, next) => {
  // once logged in succesfully,
  // render views/user/index.ejs by passing the user info as json
  res.render('users/index', {
    user: req.user.dataValues
  });
});

module.exports = router;
