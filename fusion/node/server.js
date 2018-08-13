var data = require('./categories.json')

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
const client = yelp.client(apiKey);
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

app.get('/business/:id', function (req, res) {
     client.business(req.params['id'])
         .then(response => res.send(response.jsonBody));

})

app.post('/autocomplete', function (req, res) {
    const text = req.body.text;
   parseResults(text , res);

})

function parseResults(search, res)
{
    let results = [];

        data.map(function (category) {
            if(category.parents.length !== 0 && (category.parents[0]).localeCompare("beautysvc") === 0)
            {
                if(category.title.toString().toLowerCase().includes(search.toString().toLowerCase()))
                    results = [...results, category];
            }

        })

    res.send(results);

}
app.listen(2000)