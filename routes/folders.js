var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
var authHelpers = require('../auth/auth-helpers');

/* GET folders page. */

// creates route to display all folders in folders database on the dom.
router.get('/', function(req, res, next) {
  models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
  .then(function(folders) {
    models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(bookmarks) {
      res.render('folders/index', {
        title: 'folders',
        folders: folders,
        user_id: req.user.dataValues.id,
        user_firstName: req.user.dataValues.firstName,
        bookmarks: bookmarks
      });
    });
  });
});

// create a new folder
router.post('/new', function(req, res, next) {
  models.Folder.create({
    title: req.body.folder_title,
    user_id: req.body.user_id
  }).then(function() {
    res.redirect('/folders')
  });
});

// a helper function for creating a new bookmark
router.post('/bookmarks/new', function(req, res, next) {
  models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
  .then(function(folders) {
    res.render('folders/newBookmark', {
      user: req.user.dataValues,
      folders: folders,
      folder_id: req.body.folder_id,
      folder_title: req.body.folder_title
    });
  });
});

// creates route to display all folders in folders database on the dom.
router.post('/bookmarks', function(req, res, next) {
  res.send(req.body.folder_id + req.body.folder_title);
});

// create a new bookmark
router.post('/new/bookmark', function(req, res, next) {
  models.Bookmarks.create({
    title: req.body.title,
    url: req.body.url,
    user_id: req.body.user_id,
    folder_id: req.body.folder_id,
    folder_title: req.body.folder_title
  }).then(function() {
    res.redirect('/folders')
  });
});

router.delete('/bookmark/:id', function(req, res, next) {
  models.Bookmarks.destroy({
    where: { id: req.body.bookmark_id }
  }).then(function(movie) {
    res.redirect('/folders');
  });
});



/////////////////////////////////////////////////////////////////////////////////////////////////////
// creates a page that allows user to add a movie to the database
// router.get('/new', function(req, res, next) {
//   models.Folder.findAll({ where: { user_id: req.user.dataValues.id } }).then(function(folders) {
//     res.render('folders/new', {
//       user: req.user.dataValues,
//       folders: folders
//     });
//   });
// });


// creates route to folders/id# that renders movie titles and synopsis based on whichever movie id was requested
router.get('/:id', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(folders) {
    res.render('moviesHome', {
      title: folders.title,
      folders: folders,
      synopsis: folders.synopsis
    });
  });
});

// GET /folders/:id/edit: this should bring the user to a form to edit the info. of the movie corresponding to the id.
// Don't worry about allowing the user to edit the director for now, we can't be sure that whomever is in charge of
// that part of the app has completed their work
router.get('/:id/edit', function(req, res, next) {
  models.Movie.findById(req.params.id).then(function(movie) {
    res.render('foldersEdit', {
      movie:movie
    });
  });
});

// posts edited movie info submitted (updates) don't forget method override npm install and then add to app.js
router.put('/:id', function(req, res, next) {
  models.Movie.update({
    title: req.body.title,
    synopsis: req.body.synopsis
  }, { where: { id: req.params.id } })
  .then(function() {
    res.redirect('/folders/' + req.params.id);
  });
});

router.delete('/:id', function(req, res, next) {
  models.Movie.destroy({
    where: { id: req.params.id }
  }).then(function(movie) {
    res.redirect('/folders');
  });
});

module.exports = router;
