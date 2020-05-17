const request = require('request');
const baseUrl = 'http://api.weatherstack.com';
const accessKey = '1bfcabb00094a687a8abc5ba49a69e93';
const weatherService = (latitude, longitude, callback) => {
    let finalUrl = baseUrl + '/current?access_key=' + accessKey + '&query=' +latitude+ ',' + longitude;
    console.log(finalUrl);
    request({'url':finalUrl,json:true},(error, {body}) => {
        if(error){
            callback('Unable to connect to Weather Stack Services', undefined);
        } else if(body.error){
            callback('Invalid Input. Please provide a valid location', undefined);
        } else {
            let {temperature, feelslike, weather_descriptions} = body.current;
            let data = {
                'actual_temp':temperature,
                'feels_like_temp':feelslike,
                'description':weather_descriptions[0]
            }
            callback(undefined, data);
        }
    });
}

module.exports = weatherService;
