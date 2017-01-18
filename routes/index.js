const express = require('express');
const router = express.Router(); // a function that returns new router instance (entity that can self customize a bunch of methods)
const tweetBank = require('../tweetBank');


module.exports = function(io){

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
    res.render('index', { tweets: list, showForm: true, name: name } );
  });

  router.get('/tweets/:id', function(req, res) {
    var id = +req.params.id; // coerce str id to number
    var tweet = tweetBank.find( {id: id} );
    res.render('index', { tweets: tweet, showForm: true } );
  });
  // router.get('/public/stylesheets', function(req, res, next){
  //   res.sendFile('/style.css', function(err) {
  //     if (err) res.status(err.status).end();
  //   });
  // })

  return router;
}

// module.exports = router;
