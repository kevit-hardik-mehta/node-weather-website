const request = require('request');

const forecast = (lon,lat, callback) => {

    const url =  'http://api.weatherstack.com/current?access_key=ad7f00881a666a66fb8edf8c4a827856&query=' + lon + ' , ' + lat;
    request({url:url,json:true}, (error,response) => {

        if(error){
            callback('Unabel to connect to the server!!');
        }
        else if(response.body.error){
            callback('Cordinates not found');
        }
        else{
            callback(undefined,{
                temp: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}

module.exports = forecast;