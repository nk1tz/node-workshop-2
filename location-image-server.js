var http = require('http');
var request = require('request');
var googleApiKey = "+CA&key=AIzaSyCqB6bDHnvEmYxcRm5qg6yso2V9Q4MbOiE";
var cachedCities = {};
var googleStaticMapAPIKey = "AIzaSyC3Dg15_YRu0A1uhXjkuwP-4BPurOfdTK0";

var requestListener = function (req, response) {
    // response.writeHead(200);
    // response.end('Enter your city at the end of the current URL'); 
    var clientCity = req.url.substring(1);

    //Request for LAT and LONG of clientCity
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
                var mapURL = "https://maps.googleapis.com/maps/api/staticmap?center="+cachedCities[clientCity].lat+","+cachedCities[clientCity].lng+"&zoom=12&size=400x400"+"&markers=color:purple%7Alabel:A%7C"+cachedCities[clientCity].lat+","+cachedCities[clientCity].lng+"&key=" + googleStaticMapAPIKey;
                response.writeHead(200);
                response.write('<h1>Hello</h1>');
                response.write("<p>\nI see you are in "+clientCity+", your coordinates are: </p><p>\nlatitude: " + cachedCities[clientCity].lat + "</p><p>\nlongitude: " + cachedCities[clientCity].lng + "</p>");
                response.end('<p><img src='+mapURL+'></p>'+"<p>\nThis response is fresh</p>");
            }
            else if(result){
                mapURL = "https://maps.googleapis.com/maps/api/staticmap?center="+cachedCities[clientCity].lat+","+cachedCities[clientCity].lng+"&zoom=12&size=400x400"+"&markers=color:purple%7Alabel:A%7C"+cachedCities[clientCity].lat+","+cachedCities[clientCity].lng+"&key=" + googleStaticMapAPIKey;
                response.writeHead(200);
                response.write('<h1>Hello</h1>');
                response.write("<p>\nI see you are in "+clientCity+", your coordinates are: </p><p>\nlatitude: " + cachedCities[clientCity].lat + "</p><p>\nlongitude: " + cachedCities[clientCity].lng + "</p>");
                response.end('<p><img src='+mapURL+'></p>'+"<p>\nThis response is cached</p>");
            }
            else {
                response.writeHead(200);
                response.write('<h1>Hello</h1>');
                response.end('\nSorry! NO results');                         
            }
                
        }
    });
    //Request for Map using the request LAT and LONG
    // request("https://maps.googleapis.com/maps/api/staticmap?center="+cachedCities[clientCity].lat+","+cachedCities[clientCity].lng+"&zoom=12&size=400x400&key=" + googleStaticMapAPIKey, function(err, res, body) {
    //     console.log(err, res, body);
        
    //     if (err) {
    //         response.writeHead(200);
    //         response.end('Try again! There was an error: ' + err);           
    //     }
    //     else {
            
    //         response.writeHead(200);
    //         response.write('<h2>Here is a map of where you are</h2>');
    //         response.end('\nI see you are in '+clientCity+', your coordinates are:\nlatitude: ' + cachedCities[clientCity].lat + '\nlongitude: ' + cachedCities[clientCity].lng + "\nThis is a cached response");
   
    //     }
    // });
        
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);
