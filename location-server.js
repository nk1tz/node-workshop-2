var http = require('http');
var request = require('request');
var googleApiKey = "+CA&key=AIzaSyCqB6bDHnvEmYxcRm5qg6yso2V9Q4MbOiE";

var requestListener = function (req, response) {
    // response.writeHead(200);
    // response.end('Enter your city at the end of the current URL'); 
    var clientCity = req.url.substring(1);
  
    request('https://maps.googleapis.com/maps/api/geocode/json?address=' + clientCity + googleApiKey, function(err, res, body) {
        console.log(err, res, body);
        if (err) {
            response.writeHead(200);
            response.end('Try again! There was an error: ' + err);           
        }
        else {
            var data = JSON.parse(body);
            var result = data.results[0];
              
            if (result) {
                var location = data.results[0].geometry.location;
                response.writeHead(200);
                response.end('Hello, your coordinates are:\nlatitude: ' + location.lat + '\nlongitude: ' + location.lng);           
            }
            else {
                response.writeHead(200);
                response.end('Sorry! NO results');                         
            }
                
        }
    });
}

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);
