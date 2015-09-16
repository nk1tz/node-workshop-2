var http = require('http');
var request = require('request');
var fortune = require('./library/fortune.js'); // .js is optional

var requestListener = function (req, response) {
    
    response.writeHead(200);
    response.write("Your fortune is :\n\n")
    response.end(fortune.getFortune());

};

var server = http.createServer(requestListener);
server.listen(process.env.PORT, process.env.IP);
