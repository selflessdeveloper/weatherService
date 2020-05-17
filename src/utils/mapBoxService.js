const request = require('request');
const mapBoxApiKey = 'pk.eyJ1IjoibWF2ZXJpY2tqYXJ2aXMiLCJhIjoiY2s1dDkxZ25qMGlvdzNrcGMxcjg4N3Z4byJ9._e-_lzgLJIRACku4KBAZJw';
const mapBox = (address, callback) => {
    let encodedAddress = encodeURI(address);
    request({ 'url': `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${mapBoxApiKey}`, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to Mapbox services', undefined);
        } else if (body.features.length === 0) {
            callback('Unabled to find the given location', undefined);
        } else {
            let coordinates = body.features[0].geometry.coordinates;;
            let longitude = coordinates[0];
            let latitude = coordinates[1];
            let location = body.features[0].place_name;
            callback(undefined, {longitude, latitude, location});
        }
    });
}
module.exports= mapBox;