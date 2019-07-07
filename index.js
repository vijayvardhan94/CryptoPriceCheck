//using es6
//const for required packages

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

//initilaize the app with new instance of express
const app = express();
//make app use body parser with url encoded option

app.use(bodyParser.urlencoded({extended: true}));


//specify routes
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html")
});
//app.get to target our home route

//similarly create a app.post for the body parser
app.post("/", function(req, res){
  //console.log(req.body.cryptocurrency)
  var cryptocurrency = req.body.cryptocurrency;
  var fiat = req.body.fiat;
  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var finalURL = baseURL + cryptocurrency + fiat;


  request(finalURL, function(error, response, body){
    //console.log(response.statusCode); to get response statusCode
    //console.log(body);
    //convert the data that we get
    var data = JSON.parse(body);
    var price = data.last;
    res.send("<h2>The current price of" + cryptocurrency + "is" + price + fiat+ "</h2>");

  //  console.log(price);

  });
});

//make the server listen on port 3000
app.listen(3000, function() {
  console.log("server running on port 3000");
});
