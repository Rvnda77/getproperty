const { Client } = require('@googlemaps/google-maps-services-js');

const mapsClient = new Client({});

module.exports = {
  mapsClient,
  apiKey: process.env.GOOGLE_MAPS_API_KEY,
};