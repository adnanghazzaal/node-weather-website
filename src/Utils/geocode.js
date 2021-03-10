const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYWRuYW5naGF6emFhbCIsImEiOiJja2w2N2Z6aGYwNHRrMnZxdXhlcGszczk1In0.33k1EVXc1yFihF6TZsPYrw&limit=1`;
  request({ url, json: true }, (error, { body }) => {
    // console.log(response.body)
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find Location. Try Another search", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
