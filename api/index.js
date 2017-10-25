var express = require('express');
var Router = express.Router();

// { /api/classify }
// Route that classifies a image. 
Router.post('/classify', (req,res) => {

  res.send('CLASSIFIED SHIT. ')

});


module.exports = Router;
