const express = require('express');
// const morgan = require('morgan');
const app = express();


app.use(function (req, res, next) {
  console.log("Request:", req.method, req.path, res.statusCode);
  next();
})

app.use('/special/', function(req, res, next){
  res.send("you reached the special area.");
  next();
})

app.get("/", function(req, res){
  res.send('welcome');
})

app.listen(3000, function() {
  console.log('server listening');
})
