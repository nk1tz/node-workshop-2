var http = require('http');
var request = require('request');
var bigHugeKey = "41acd19c3639856d205e03a0c61fdb5b";

var requestListener = function (req, response) {

    var clientWord = req.url.substring(1);
  
    request('http://words.bighugelabs.com/api/2/' + bigHugeKey + '/' + clientWord + '/json', function(err, res, body) {
        // console.log(err, res, body);
        if (err) {
            response.writeHead(200);
            response.end('Try again! There was an error: ' + err);           
        }
        else {
            var synonyms = JSON.parse(body);
            console.log(synonyms);
            
            var verbs = synonyms.verb.syn;
            var nouns = synonyms.noun.syn;
            // var adjectives = synonyms.adjective.syn

            if (synonyms) {
                response.writeHead(200);
                response.end("Hello, Some synonyms of "+clientWord+" are:\n" + "Nouns:  "+nouns+"\nAdjectives:  "+"\nVerbs:  "+verbs); 
                console.log("ENDED RESPONSE");
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
