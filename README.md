# Mark It

Mark It is an app designed to allow a user to manage their bookmarks no matter what browser the bookmark url was originally navigated to or found through. Mark It is a full stack Express/Postgres CRUD application that allows users to create, store, edit and delete bookmarks that have been saved. It is an app that is accessible no matter what browser is used.


## Technologies Used

* [BOOTSTRAP](https://getbootstrap.com/) - CSS, JavaScript and fonts
* [SASS](http://sass-lang.com/) - CSS
* [MATERIALIZE](http://materializecss.com/) - CSS
* [POSTGRESQL](https://www.postgresql.org/) - Object-relational database 
* [EJS](https://github.com/tj/ejs) - Express compiler
* [EXPRESS](http://expressjs.com/) - Node.js web application framework
* [NODEMON](https://nodemon.io/) - Used to monitor for any changes in your source / restart server automatically
* [SEQUELIZE](http://docs.sequelizejs.com/en/v3/) - promise-based ORM for Node.js and io.js (supports PostgresSQL)
* [TRELLO](https://trello.com/) - Project Management Tool
* [HEROKU](https://www.heroku.com/home) - Cloud deployment
* [INVISION](https://www.invisionapp.com/) - Prototyping, Collaboration & Workflow platform


### General Approach Used

We immediately knew thought the idea of having a bookmark management application that had the unique feature of cross-browser accessiblity was a good one. What we set out to do was understand and prove that what we thought was true. So we started out working with two amazing UX designers on our R&D for what became the final design of our project. 

We started out with user interviews asking the following questions:


	•	What browser do you typically use?
	•	What are some common websites do you use?
	•	How often do you go to those websites?
	•	When you are using the internet and want to save something for later, how do you do ?
	⁃	(if they don’t mention bookmarks) - Do you know what bookmarks are?
	•	Are there any other ways that you save websites that you like besides bookmarks?
	•	What do you like most about using bookmarks?
	•	What do you like least about using bookmarks?
	⁃	(depending on which browser) The bookmarks you saved on ___ browser, can you access them on other browsers?
	•	The bookmarks you saved on your PC, can you access them on your friends PC or 
	•	public library’s PC?
	•	How important is it to you to have easy access to websites that you like? 
We mapped through the UX workflow asking the above questions to a small pool of people.

![UX workflow] (https://raw.githubusercontent.com/tenzin15/Markit/master/public/img/UXworkflow.JPG)

Responses to be analyzed:

![Compiled responses from survey questions] (https://raw.githubusercontent.com/tenzin15/Markit/master/public/img/compiledsurveyanswers.JPG)

Once we analyzed the data we were able to create Kevin, our WDI Compiled Persona:

![WDI Compiled Persona 1](https://github.com/tenzin15/Markit/blob/master/public/img/compiledUserKevin.png?raw=true)

### Installation Instructions

In package.json add a dev script to your scripts property that starts nodemon.
```
...
"scripts": {
  "start": "node ./bin/www",
  "dev": "nodemon ./bin/www"
},
...

```
git clone https://github.com/tenzin15/Markit.git
cd Markit
npm install

You will run your local server by running: `npm run dev`. We must leave the
`start` command alone because that is what Heroku runs to boot your app when you
deploy it. Nodemon is a dev dependency, and not installed when `npm install` is
run in the production environment. Therefore, the nodemon command must be mapped
to a different npm script.

Run `npm run dev` and visit localhost:3000 to make sure everything is working.

```
```

### User Stories

In understanding our target user, we were able to understand a better user flow;

![Creating the user flow] (https://github.com/tenzin15/Markit/blob/master/public/img/userflows.png?raw=true)

![UX user flow-ux teamwork] (https://github.com/tenzin15/Markit/blob/master/public/img/UXTeamwork.JPG?raw=true)


## Wireframes and Trello:


![Login Page First Draft](https://github.com/tenzin15/Markit/blob/master/public/img/login1stroughdraft.png?raw=true)

![Bookmarks Page First Draft] (https://github.com/tenzin15/Markit/blob/master/public/img/bookmarkspg1roughdraft.png?raw=true)


We Created a user journey with the app [invision](https://projects.invisionapp.com/share/4DAAIXRAM#/screens)

We used [Trello](https://trello.com/b/RcBPS5kw) to manage workflow and make sure to check what was and was not completed in our MVP


### Unsolved Problems or Major Hurdles

Search fucntionality and favorites functionality were both features that we really wanted to complete and have working, but we just didn't have the time
to create, test and get up and running properly. We spent a lot of time in the begining tyring to figure out how to add React to the project
and quickly realized that we needed to focus on the MVP and the tech requirements and put React implementation in an Express Router with Postgres on the 
wishlist for another project with a longer sprint time. 

### Code Highlight

Edit function for bookmark:

```
...
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
...

```

## Deployment

Deployed on [Heroku](https://markit-x.herokuapp.com/)

## Authors

* **Tenzin Chhosphel** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/tenzin15)
* **Kyla Massey** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/kylamassey)
* **Shauan Ferreira Leite** - *Initial work* - [LinkedIn](https://www.linkedin.com/in/shauanleite)



## License

This project is currently in the process of being licensed. 

## Acknowledgments

* We'd like to acknowledge GA Frontlines for keeping the coffee and oatmeal coming!


Created within a collaborative git workflow this project is a full stack Express/Postgres CRUD application. 
