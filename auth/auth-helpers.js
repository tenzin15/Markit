// module dependencies
const bcrypt = require('bcryptjs');
const models = require('../db/models/index');

// this is probably the most important function for authentication
// purpose, using bcrypt it compares user's entered password
// and the once assocaited with it on the database
function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

// this funtion checks if the user is already logged in or not
function loginRedirect(req, res, next) {
  if (req.user) return res.status(401).json(
    { status: 'You are already logged in' }
  );

  return next();
}

// this function is executed when a new user creates his/her account
// it uses ORM Sequelize to create a new user account
function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  }).then(() => {
    res.redirect('/');
  });
}

function loginRequired(req, res, next) {
  if (!req.user) return res.status(401).json({ status: 'Please log in' });

  return next();
}

module.exports = {
  comparePass,
  createUser,
  loginRequired,
  loginRedirect
}
