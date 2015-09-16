var http = require('http');
var request = require('request');
var googleApiKey = "+CA&key=AIzaSyCqB6bDHnvEmYxcRm5qg6yso2V9Q4MbOiE";
var cachedCities = {};

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

            if( result && !cachedCities.hasOwnProperty( clientCity ) ) {
                
                var location = data.results[0].geometry.location;
                cachedCities[clientCity] = location;
                response.writeHead(200);
                response.end('Hello, I see you are in '+clientCity+', your coordinates are:\nlatitude: ' + cachedCities[clientCity].lat + '\nlongitude: ' + cachedCities[clientCity].lng + "\nThis response is fresh");
                
            }
            else if(result){
                response.writeHead(200);
                response.end('Hello, I see you are in '+clientCity+', your coordinates are:\nlatitude: ' + cachedCities[clientCity].lat + '\nlongitude: ' + cachedCities[clientCity].lng + "\nThis is a cached response");
            }
            else {
                response.writeHead(200);
                response.end('Sorry! NO results');                         
            }
                
        }
    });
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);
