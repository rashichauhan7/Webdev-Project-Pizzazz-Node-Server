var app = require('./app');
var debug = require('debug')('backend:server');
var http = require('http');
const yelp = require('yelp-fusion');

var port = normalizePort(process.env.PORT || '4000');
app.set('port', port);

const apiKey = '579BEGwnrM59wcpM0YqOJEzhD3S_WzX3xVByv_G2zHC5JJUSH8PE01wojvBQSDh8Lyco0wXUJAlvYOPOazNYGoza8n1XwtbW82dTFUqdv7lrn30h6dNwSr40PvpQW3Yx';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


var server = http.createServer(app);

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}


var expressServerUtils = require('express-server-utils')(server, port);
expressServerUtils.listen();
expressServerUtils.handleOnError();
expressServerUtils.handleOnListening();

const exitActions = [server.close];
expressServerUtils.handleShutDown(exitActions);

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/search', function (req, res) {
    var term = req.body.searchTerm;
    var location = req.body.location;
    const searchRequest = {
        term : term,
        location: location,
        categories: 'hair, othersalons'
    };
    const client = yelp.client(apiKey);

    client.search(searchRequest).then(response => {
        const Result = response.jsonBody.businesses;
        let salons = [];
        for(var i = 0; i < Result.length; i++)
        {
            const prettyJson = JSON.stringify(Result[i], null, 4);
            salons[i] = Result[i];

        }
        console.log(salons);
        res.send(JSON.stringify(salons))
    }).catch(e => {
        console.log(e);
    });

});
