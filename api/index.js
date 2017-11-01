var express = require('express');
var Router = express.Router();
var Vision = require('@google-cloud/vision');
var spawn = require("child_process").spawn;
var fs = require('fs');
var uuidv1 = require('uuid/v1');

// Use python shell
var PythonShell = require('python-shell');



//File path for the image classified.
var filePath = 'testing.jpg'; 



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
      mode : "binary",
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
      res.json(success_response)
    }
  });


});


Router.post('/testing', function(req,res){

  var binary_image = req.body.binary_image;
  var myfilename = uuidv1() + '.jpg';
  
  var success_response = {
    success : true,
  };

  var error_response = {
    success : false
  }

      var pyshell = new PythonShell('api/image_creation.py', {
        mode: 'binary',
        args : [myfilename]
    });

    var tf_options = {
      mode : "text",
      args : [myfilename],
      scriptPath : './api',
    }


    //Python shell to create an image. 
    pyshell.send(new Buffer(binary_image)).end(function(err) {

      
      if (err){
        error_response.message = 'Error creating the image.'
        res.send(error_response)
      }else{
        

        PythonShell.run('main.py', tf_options, function(err,results){
          
                  if(err){
                    
                    console.log(err)
                    res.send(error_response)
          
                  }else{
                    
                   
                    //Make the data more accurate for the results. 
                    results = results.map(function(da){
                      
                      
                          var split_arr = da.split('(');
                          
                          var description = split_arr[0]
                          
                          var numbertype = split_arr[1].split('=')[1].slice(0, -1) * 100
                              
                          return {
                              name : description,
                              percentage : numbertype
                          }
                      
                      })
                    success_response.message = 'Classified test image.'
                    success_response.data = results;
                    
          
                    res.send(results)
          
                    //Remove the file from the server. 
                    fs.unlinkSync(myfilename);
          
                  }
                })
       
        // Run the tensorflow model. 

      }

      
    
    });

  


})


Router.post('/conversion', function(req,res){

 var myfilename = uuidv1() + '.jpg';

  var binary_image = req.body.binary_image;

  var success_response = {
    success : true,
  }

  var error_response = {
    success : false,
  }

  //Options to send to the python script.
  var image_options = {
      mode : "text",
      args: [binary_image, myfilename],
      scriptPath : './api'
  };

  var tf_options = {
    mode : "text",
    args : [myfilename],
    scriptPath : './api',
  }


  PythonShell.run('image_creation.py', image_options, function (err, results) {
    if (err){
      console.log(err)
      res.send(error_response)
    }else{
    

      PythonShell.run('main.py', tf_options, function(err,results){

        if(err){
          
          console.log(err)
          res.send(error_response)

        }else{
          
          //Make the data more accurate for the results. 
          results = results.map(function(da){
            
            
                var split_arr = da.split('(');
                
                var description = split_arr[0]
                
                var numbertype = split_arr[1].split('=')[1].slice(0, -1) * 100
                    
                return {
                    name : description,
                    percentage : numbertype
                }
            
            })
          success_response.message = 'Classified test image.'
          success_response.data = results;
          

          res.json(success_response)

          //Remove the file from the server. 
          fs.unlinkSync(myfilename);

        }
      })


    }
  });

})



Router.post('/read-write', (req,res) => {
  
  var binary_image = req.body.binary_image;
  
    var success_response = {
      success : true,
    }
  
    var error_response = {
      success : false,
    }
  
    //Options to send to the python script.
    var options = {
        mode : "text",
        args: [binary_image],
        scriptPath : './api'
    };
  
  
    PythonShell.run('testing/write.py', options, function (err, results) {
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
