const express = require('express');
require('dotenv').config();
const Axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');


PORT = process.env.PORT || 5000;
API = process.env.WEATHER_API

const app = express();
app.use(bodyParser.json())

app.post('/getAddress', async(req, res) => {
    await Axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${req.body.zipcode},${req.body.country}&appid=${API}&units=imperial`)
        .then(res1 => {
            res.send(res1.data)
        }).catch(error => {
            res.status(404).send(error)
        })
})

app.post('/getWeather', async(req, res) => {
    await Axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.lon}&exclude=minutely&appid=${API}&units=imperial`)
        .then(res2 => {
            res.send(res2.data)
        }).catch(error => {
            res.status(404).send(error)
        })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log("server is listening")
})