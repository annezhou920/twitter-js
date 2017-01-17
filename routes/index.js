
const bodyParser = require('body-parser');
const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');


module.exports = function(io){
  // parse application/x-www-form-urlencoded
  router.use(bodyParser.urlencoded({ extended: false }))

  // parse application/json
  router.use(bodyParser.json())

  // middleware function to start serving images, CSS files, and JS files directly
  // instead of using res.sendFile for each file
  // everything we put in public will be automatically accessible via URI path
  router.use(express.static('public')); // just put 'public' in quotes, no backlash

  router.get('/', function (req, res, next) {
    let tweets = tweetBank.list();
    io.sockets.emit('newTweet', { tweets: tweets });
    res.render( 'index', { tweets: tweets, showForm: true } );
  });

  router.post('/tweets', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    res.redirect('/');
  });

  router.get('/users/:name', function(req, res) {
    var name = req.params.name;
    var list = tweetBank.find( {name: name} );
    // var list = tweetBank.find( function(o){
    //   return o.name === name;
    // });
    res.render('index', { tweets: list, showForm: true, name: name } );
  });

  router.get('/tweets/:id', function(req, res) {
    var id = +req.params.id;
    var tweet = tweetBank.find( {id: id} );
    // var tweet = tweetBank.find( function(o){
    //   return o.id === id;
    // });
    res.render('index', { tweets: tweet, showForm: true } );
  });
  // router.get('/public/stylesheets', function(req, res, next){
  //   res.sendFile('/style.css', function(err) {
  //     if (err) res.status(err.status).end();
  //   });
  // })

  return router;
}
