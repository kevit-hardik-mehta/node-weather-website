const request = require('request');

const geocode = (address, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=ad7f00881a666a66fb8edf8c4a827856&query=' + address;
    request({ url: url, json: true }, (error, response) => {

        if (error) {
            callback("Unable to connect to the server!!");
        }
        else if (response.body.error) {
            callback("Request is not proper!!");
        }
        else {
            callback(undefined, {
                latitude: response.body.location.lat,
                longitude:  response.body.location.lon
            });
        }

    })

}

module.exports = geocode;