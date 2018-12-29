var chalk = require('chalk');
var express = require('express');
var mongoose = require('mongoose');
var db = require('./models/db.js');
var story = require('./routes/story.js');
var routes = require('./routes/route.js');
var user = require('./routes/user.js');


var bodyParser = require('body-parser');

var session = require('express-session');

var ejs= require('ejs');
var app = express();


var routes=require('./routes/route.js');
app.use(express.static('public',{root:'.'}));
app.set('view engine','ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({secret: "qwertyuiop" , resave:true,saveUninitialized:true}));

app.get('/',routes.index);
app.get('/login',routes.login);


app.get('/register',routes.register);
app.post('/newUser', user.doCreate);

app.get('/registrationSuccessful', user.registrationSuccessful);

app.post('/authenticate', user.login);
app.get('/logout', user.logout);
app.get('/stories', story.stories);




app.get('/new-story', routes.newStory);
app.post('/add-story', story.addStory);

app.get('/stories/:story', story.getStory);

app.post('/stories/:slug/saveComment', story.saveComment);

app.get('/techStack', routes.techStack);


app.use(function(req, res) {
    console.log(chalk.red("Error: 404"));
    res.status(404).render('404');
});

app.use(function(error, req, res, next) {
    console.log(chalk.red('Error : 500' + error))
    res.status(500).render('500');
});

var port = process.env.PORT || 8080;

var server = app.listen(port, function(req, res) {
    console.log(chalk.green("Catch the action at http://localhost:" + port));
});