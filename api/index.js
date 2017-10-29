var express = require('express');
var Router = express.Router();
var Vision = require('@google-cloud/vision');
var spawn = require("child_process").spawn;


// Use python shell
var PythonShell = require('python-shell');




// { /api/classify }
// Route that classifies a image.
Router.post('/classify', (req,res) => {

  var binary_image = req.body.binary_image;

  var error_response = {
    success : false,
  };

  var success_response = {
    success : true,
  };


  //Options to send to the python script.
  var options = {
      mode : "buffer",
      args: [binary_image],
      scriptPath : './api'
  };


  PythonShell.run('main.py', options, function (err, results) {
    if (err){
      console.log(err)
      res.send(error_response)
    }else{
      success_response.message = 'Classified test image.'
      success_response.data = results;
      res.send(success_response)
    }
  });


});


Router.post('/testing', function(req,res){

  var binary_image = req.body.binary_image;

  console.log(binary_image)

  res.send(binary_image)

})

  /*  Cloud Vision Code Snippets. */
// // The name of the image file to annotate
// var fileName = './resources/wakeupcat.jpg';
//
// // Prepare the request object
// var request_obj = {
//   source: {
//     filename: fileName
//   }
// };
//
// // Performs label detection on the image file
// vision.labelDetection(request_obj)
//   .then((results) => {
//     const labels = results[0].labelAnnotations;
//
//     console.log('Labels:');
//     labels.forEach((label) => console.log(label.description));
//   })
//   .catch((err) => {
//     console.error('ERROR:', err);
//   });


module.exports = Router;
