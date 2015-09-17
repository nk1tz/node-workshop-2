var http = require('http');
var request = require('request');
var bigHugeKey = "41acd19c3639856d205e03a0c61fdb5b";

var requestListener = function (req, response) {

    var clientWord = req.url.substring(1);
    console.log(clientWord);
    
    if(clientWord === "favicon.ico"){
        response.writeHead(200);
        response.end(" ");
    }else{
        // console.log();
        request('http://words.bighugelabs.com/api/2/' + bigHugeKey + '/' + clientWord + '/json', function(err, res, body) {
            // console.log(err, res, body);
            // console.log(body);
            if (err) {
                response.writeHead(200);
                response.end('Try again! There was an error: ' + err);           
            }
            else {
                //Parse the json string into an object.
                var synonyms = JSON.parse(body);
                console.log(synonyms);
                
                if( synonyms.hasOwnProperty("verb") ) var verbs = synonyms.verb.syn;
                if(synonyms.hasOwnProperty("noun")) var nouns = synonyms.noun.syn;
                if(synonyms.hasOwnProperty("adjective")) var adjectives = synonyms.adjective.syn;
    
                if (synonyms) {
                    //Output response to browser.
                    response.writeHead(200);
                    response.write("Hello, Some synonyms of "+clientWord+" are:");
                    
                    if( verbs ){
                        response.write("\n\nVerbs:  " + verbs);
                    }
                    if( nouns ){
                        response.write("\n\nNouns:  " + nouns);
                    }
                    if( adjectives ){
                        response.write("\n\nAdjectives:  " + adjectives);
                    } 
                    response.end("\n ");
                }
                else {
                    //output response to browser - no results
                    response.writeHead(200);
                    response.end('Sorry! NO results');                         
                }
            }
        });
    }
};

var server = http.createServer(requestListener);

server.listen(process.env.PORT, process.env.IP);
