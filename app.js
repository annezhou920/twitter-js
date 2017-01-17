const express = require('express');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes/');
const app = express(); // creates an instance of an express application

const socketio = require('socket.io');
// ...
var server = app.listen(3000, function(){ console.log('The server started')});
var io = socketio.listen(server);

// allows you to set up a server:
// app.listen(3000, function() {
//   console.log('The server started.');
// });

app.use(function(req, res, next) { // registers for every incoming request
  console.log('Request:', req.method, req.path, res.statusCode);
  next();
});

app.use('/special/', function(req, res, next) {
  res.send('you reached the special area');
  next();
});

app.use('/', routes(io));

app.set('view engine', 'html'); // have res.render work with html
app.engine('html', nunjucks.render); // when giving html files to res.render, tell it to use nunjucks
nunjucks.configure('views', { noCache: true });

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
