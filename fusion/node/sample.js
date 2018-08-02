'use strict';

const yelp = require('yelp-fusion');

// Place holder for Yelp Fusion's API Key. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const apiKey = '579BEGwnrM59wcpM0YqOJEzhD3S_WzX3xVByv_G2zHC5JJUSH8PE01wojvBQSDh8Lyco0wXUJAlvYOPOazNYGoza8n1XwtbW82dTFUqdv7lrn30h6dNwSr40PvpQW3Yx';

const searchRequest = {
  term:'Four Barrel Coffee',
  location: 'san francisco, ca'
};

const client = yelp.client(apiKey);

client.search(searchRequest).then(response => {
  const firstResult = response.jsonBody.businesses[0];
  const prettyJson = JSON.stringify(firstResult, null, 4);
  console.log(prettyJson);
}).catch(e => {
  console.log(e);
});