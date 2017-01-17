const express = require('express');
const router = express.Router();
// could use one line instead: const router = require('express').Router();
const tweetBank = require('../tweetBank');

router.use(express.static('/public'));

router.get('/', function (req, res) {
  let tweets = tweetBank.list();
  res.render( 'index', { tweets: tweets } );
});

// router.get('/public/stylesheets', function(req, res, next){
//   res.sendFile('/style.css', function(err) {
//     if (err) res.status(err.status).end();
//   });
// })


module.exports = router;
