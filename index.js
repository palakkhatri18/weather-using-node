const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const axios = require('axios')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './templates')


app.get('/', function (req, res) {
  res.render('home', {temp:null})
})


app.post('/fetch_data', function(req, res){
    const cityName = req.body.city
    console.log(cityName)
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + "&appid=6ada010bb4900512c9fbac20e59d26ed&units=metric"
    axios.get(url)
    .then(function (response) {
      // handle success
      let x = response['data']['main']['temp']
  
      console.log(x);
      res.render('home',{temp:x})
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
  
  })
app.listen(3000)