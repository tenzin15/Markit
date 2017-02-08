var express = require('express');
var router = express.Router();
var models = require('../db/models/index');
var authHelpers = require('../auth/auth-helpers');

/* GET folders page. */

// creates route to display all folders in folders database on the dom.
router.get('/', function(req, res, next) {
  models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
  .then(function(folders) {
    let first_folder_id = null;
    let first_folder_title = '';
    if (folders.length < 1) {
      first_folder_id = 89797947; // random id that can't match folder id
      first_folder_title = 'No Folder Added Yet!';
    }
    else {
      first_folder_id = folders[0].id;
      first_folder_title = folders[0].title;
    }
    models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(bookmarks) {
      res.render('folders/index', {
        title: 'folders',
        folders: folders,
        user_id: req.user.dataValues.id,
        user_firstName: req.user.dataValues.firstName,
        bookmarks: bookmarks,
        folder_id: first_folder_id,
        folder_title: first_folder_title
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



// only show the bookmarks that belongs to the this folder
router.post('/bookmarks', function(req, res, next) {
    // res.send(req.body.folder_id + req.body.folder_title + req.body.folder_user_id);
    models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(folders) {
      models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
      .then(function(bookmarks) {
        res.render('folders/index', {
          title: 'folders',
          folders: folders,
          user_id: req.user.dataValues.id,
          user_firstName: req.user.dataValues.firstName,
          bookmarks: bookmarks,
          folder_id: req.body.folder_id,
          folder_title: req.body.folder_title,
          folder_user_id: req.body.folder_user_id
        });
      });
    });
  });

// create a new bookmark
router.post('/new/bookmark', function(req, res, next) {
  models.Bookmarks.create({
    title: 'Add Title',
    url: req.body.enterBookmarkUrl,
    user_id: req.user.dataValues.id,
    folder_id: req.body.folder_id,
    folder_title: req.body.folder_title
  })
  .then(function() {
    // res.redirect('/folders');
    models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(folders) {
      models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
      .then(function(bookmarks) {
        res.render('folders/index', {
          title: 'folders',
          folders: folders,
          user_id: req.user.dataValues.id,
          user_firstName: req.user.dataValues.firstName,
          bookmarks: bookmarks,
          folder_id: req.body.folder_id,
          folder_title: req.body.folder_title
        });
      });
    });
  });
});

// post for bookmarks search
router.post('/bookmarks/search', function(req, res, next) {
    models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(folders) {
      models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id, title: { $ilike: `%${req.body.enterBookmarkTitleForSearch}%` } } })
      .then(function(bookmarks) {
        res.render('folders/index', {
          title: 'folders',
          folders: folders,
          user_id: req.user.dataValues.id,
          user_firstName: req.user.dataValues.firstName,
          bookmarks: bookmarks,
          folder_id: req.body.folder_id,
          folder_title: req.body.folder_title
        });
      });
    });
  });

// post for bookmarks favorites
// update the Bookmarks models by setting favorite column to true
router.post('/bookmarks/favorites', function(req, res, next) {
    models.Bookmarks.update({
      favorite: true
    }, { where: { id: req.body.bookmark_id } })
    .then(function() {
      models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
      .then(function(folders) {
        models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
        .then(function(bookmarks) {
          res.render('folders/index', {
            title: 'folders',
            folders: folders,
            user_id: req.user.dataValues.id,
            user_firstName: req.user.dataValues.firstName,
            bookmarks: bookmarks,
            folder_id: req.body.folder_id,
            folder_title: req.body.folder_title
          });
        });
      });
    });
  });


// display only the favorite bookmarks
router.post('/bookmarks/favorites-list', function(req, res, next) {
  models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
  .then(function(folders) {
    models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(bookmarks) {
      res.render('folders/index', {
        title: 'folders',
        folders: folders,
        user_id: req.user.dataValues.id,
        user_firstName: req.user.dataValues.firstName,
        bookmarks: bookmarks,
        folder_id: req.body.folder_id,
        folder_title: "Favorite Bookmarks"
      });
    });
  });
});



// // create a new bookmark
// router.post('/new/bookmark', function(req, res, next) {
//   models.Bookmarks.create({
//     title: req.body.title,
//     url: req.body.url,
//     user_id: req.body.user_id,
//     folder_id: req.body.folder_id,
//     folder_title: req.body.folder_title
//   }).then(function() {
//     res.redirect('/folders');
//   });
// });

//EDIT

// router.put('/bookmarks/edit', function(req, res, next) {
//   models.Bookmarks.update({
//     title: req.body.title,
//     url: req.body.url,
//   }, { where: { id: req.body.bookmark_id } })
//   .then(function() {
//     res.redirect('/folders');
//   });
// });

router.put('/bookmark/:id', function(req, res, next) {
  models.Bookmarks.update({
    title: req.body.bookmark_title,
    url: req.body.bookmark_url,
  }, { where: { id: req.body.bookmark_id } })
  .then(function() {
    // res.redirect('/folders');
    models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(folders) {
      models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
      .then(function(bookmarks) {
        res.render('folders/index', {
          title: 'folders',
          folders: folders,
          user_id: req.user.dataValues.id,
          user_firstName: req.user.dataValues.firstName,
          bookmarks: bookmarks,
          folder_id: req.body.folder_id,
          folder_title: req.body.folder_title
        });
      });
    });
  });
});

router.delete('/bookmark/:id', function(req, res, next) {
  models.Bookmarks.destroy({
    where: { id: req.body.bookmark_id }
  }).then(function(movie) {
    // res.redirect('/folders');
    models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(folders) {
      models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
      .then(function(bookmarks) {
        res.render('folders/index', {
          title: 'folders',
          folders: folders,
          user_id: req.user.dataValues.id,
          user_firstName: req.user.dataValues.firstName,
          bookmarks: bookmarks,
          folder_id: req.body.folder_id,
          folder_title: req.body.folder_title
        });
      });
    });
  });
});


// delete a folder
router.delete('/:id', function(req, res, next) {
  models.Folder.destroy({
      where: { id: req.body.folder_id }
  })
  .then(function() {
    models.Folder.findAll({ where: { user_id: req.user.dataValues.id } })
    .then(function(folders) {
      let first_folder_id = null;
      let first_folder_title = '';
      if (folders.length < 1) {
        first_folder_id = 89797947; // random id that can't match folder id
        first_folder_title = 'No Folder Added Yet!';
      }
      else {
        first_folder_id = folders[0].id;
        first_folder_title = folders[0].title;
      }
      models.Bookmarks.findAll({ where: { user_id: req.user.dataValues.id } })
      .then(function(bookmarks) {
        res.render('folders/index', {
          title: 'folders',
          folders: folders,
          user_id: req.user.dataValues.id,
          user_firstName: req.user.dataValues.firstName,
          bookmarks: bookmarks,
          folder_id: first_folder_id,
          folder_title: first_folder_title
        });
      });
    });
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

// // creates route to folders/id# that renders movie titles and synopsis based on whichever movie id was requested
// router.get('/:id', function(req, res, next) {
//   models.Movie.findById(req.params.id).then(function(folders) {
//     res.render('moviesHome', {
//       title: folders.title,
//       folders: folders,
//       synopsis: folders.synopsis
//     });
//   });
// });

// // GET /folders/:id/edit: this should bring the user to a form to edit the info. of the movie corresponding to the id.
// // Don't worry about allowing the user to edit the director for now, we can't be sure that whomever is in charge of
// // that part of the app has completed their work
// router.get('/:id/edit', function(req, res, next) {
//   models.Movie.findById(req.params.id).then(function(movie) {
//     res.render('foldersEdit', {
//       movie:movie
//     });
//   });
// });

// // posts edited movie info submitted (updates) don't forget method override npm install and then add to app.js
// router.put('/:id', function(req, res, next) {
//   models.Movie.update({
//     title: req.body.title,
//     synopsis: req.body.synopsis
//   }, { where: { id: req.params.id } })
//   .then(function() {
//     res.redirect('/folders/' + req.params.id);
//   });
// });

// router.delete('/:id', function(req, res, next) {
//   models.Movie.destroy({
//     where: { id: req.params.id }
//   }).then(function(movie) {
//     res.redirect('/folders');
//   });
// });

module.exports = router;
