const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

/*
//현재 app.js가 위치한 파일의 경로
console.log(__dirname)
//경로 + 파일
console.log(__filename)
console.log(path.join(__dirname, '../public'))
*/

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directiory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
  res.render('index', {
    title: 'Weather',
    name: 'Henry Hwang',
  })
})

app.get('/about', (req,res)=>{
  res.render('about',{
    fotitlerecast: 'About Me',
    name: 'Henry Hwang',
  })
})

app.get('/help', (req,res)=>{
  res.render('help',{
    helpText: 'This is help page',
    title: 'Help',
    name: 'Henry Hwang',
  })
})

app.get('/weather', (req,res)=>{
  console.log(req.query)
  if(!req.query.address){
    res.send({
      error: 'You must provide a address'
    })
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return console.log(error)
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log(error)
      }
      
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})


app.get('/products', (req, res)=>{
  if(!req.query.search){
    res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products:''
  })

})

// app.com 
// app.com/help
// app.com/about
app.get('/help/*', (req, res)=>{
  res.render('error',{
    error: 'Help article not found'
  })
})

app.get('*', (req, res)=>{
  res.render('error',{
    error: 'My 404 page'
  })
})

app.listen(3000, ()=>{
  console.log('Server is up on port 3000.')
})