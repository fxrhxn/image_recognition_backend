var express = require('express');
var app = express();
var bodyParser = require('body-parser')

//Use the body-parser yeeeet.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

var api_routes = require('./api');

//The api routes that we will use.
app.use('/api', api_routes);

// { / }
// The homepage, there's a message for you if you go there.
app.get('/', function(req,res){
  res.send('There really is no UI to this app hahahahaha fuck you :)')
});


var port = process.env.PORT || 3000;

app.listen(port, () => console.log('Listening on port: ' + port ));
