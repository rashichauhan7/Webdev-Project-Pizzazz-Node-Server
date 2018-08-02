var express = require('express')
var app = express()
const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '579BEGwnrM59wcpM0YqOJEzhD3S_WzX3xVByv_G2zHC5JJUSH8PE01wojvBQSDh8Lyco0wXUJAlvYOPOazNYGoza8n1XwtbW82dTFUqdv7lrn30h6dNwSr40PvpQW3Yx';

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

})

app.listen(4000)