const path = require('path');
const request = require('request');
const mapBox = require('./utils/mapBoxService');
const weather = require('./utils/weatherStackService');
const express = require('express');
const hbs = require('hbs');
console.log(__dirname);
console.log(path.join(__dirname, '../public'));
const app = express();

//paths for storing templates information 
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsPathDirectory = path.join(__dirname, '../templates/partials');

const publicDirectoryPath = path.join(__dirname, '../public');
//Express configurations for views
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsPathDirectory)
//Express Statis Setup configurations
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather Service',
        'name': 'Manjunatha V P'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About page',
        'name': 'Manjunatha V P'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Welcome to help page',
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ 'error': 'You must provide an address' });
    }
    let userInput = req.query.address;
    mapBox(userInput, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ 'error': error });
        } else {
            console.log('Obtained co-ordinates are latitude ' + latitude + ' logitude ' + longitude + ' location:' + location);
            weather(latitude, longitude, (errorWeather, { description, actual_temp: temp, feels_like_temp: feelsLike } = {}) => {
                if (errorWeather) {
                    return res.send({ 'error': errorWeather });
                } else {
                    res.send({ 'description': description, 'Actual Temperature': temp, 'FeelLiketemperature': feelsLike })
                    console.log(description + '. Current temperature:' + temp + ' but feels like:' + feelsLike);
                }
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', { 'title': 'Help article not found' });
})
app.get('*', (req, res) => {
    res.render('error', { 'title': 'Page not found' });
})

app.listen(3000, () => {
    console.log('Server is up and running on port 3000');
})