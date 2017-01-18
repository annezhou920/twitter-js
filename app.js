const express = require('express');
const morgan = require('morgan'); // tool that helps create logging middleware
const nunjucks = require('nunjucks');
const routes = require('./routes/'); // links to modular routing
const app = express(); // creates an instance of an express application
const bodyParser = require('body-parser');
const socketio = require('socket.io');

// ...
var server = app.listen(3000, function(){ console.log('The server started')});
var io = socketio.listen(server);

// allows you to set up a server:
// app.listen(3000, function() {
//   console.log('The server started.');
// });

app.use(morgan('dev')); //logging
// registers for every incoming request (essentially this is what morgan is doing)
// app.use(function(req, res, next) {
//   console.log('Request:', req.method, req.path, res.statusCode);
//   next();
// });

// middleware function to start serving images, CSS files, and JS files directly
// instead of using res.sendFile for each file
// everything we put in public will be automatically accessible via URI path
app.use(express.static('public')); // just put 'public' in quotes, no backlash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); // for HTML for submits

// parse application/json - AJAX request
app.use(bodyParser.json());

app.use('/special/', function(req, res, next) {
  res.send('you reached the special area');
  next();
});

app.use('/', routes(io)); // router that express gives you is a middleware function

app.set('view engine', 'html'); // have res.render work with html
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true }); // where to find the views

// nunjucks.render('index.html', locals, function (err, output) {
//     console.log(output);
// });

// var locals = {
//   title: 'An Example',
//   people: [
//     { name: 'Gandalf' },
//     { name: 'Frodo' },
//     { name: 'Hermione' }
//   ]
// };
//

// nunjucks.render('index.html', locals, function (err, output){
//   console.log(output);
// });
//

// app.get('/', function(req, res, next){
//   const people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];
//   res.render('index', {title: 'Hall of Fame', people: people});
// });
