const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public')
const partials = path.join(__dirname,'../partials')

app.set('view engine','hbs');
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partials);

app.get('',(req,res) => {
    res.render('index',{
        name: 'Hardik',
        surname: 'Mehta'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        name: 'Hardik',
        surname: 'Mehta'
    });
})

app.get('/weather',(req,res) => {
    if (!req.query.address) {
        res.send({
            error: 'You have to pass a search parameter'
        })
    }
    else{

        geocode(req.query.address,(error,data) => {
            if (error) {
                res.send({
                    error: error                
                })
            }
            else{
                forecast(data.latitude,data.longitude,(error, forecastData) => {
                    if (error) {
                        res.send({
                            error: error
                        })
                    }
                    else{
                        res.send({
                            tempreature: forecastData.temp,
                            feelsike: forecastData.feelslike
                        })
                    }
                })
            }
        });
             
    }    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'hardik Mehta',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Hardik Mehta',
        errorMessage: 'Page not found.'
    })
})




app.listen(3000,() => {
    console.log("Server is up and running on port 3000");   
})

