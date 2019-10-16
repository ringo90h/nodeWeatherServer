console.log('')

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

/*
//현재 app.js가 위치한 파일의 경로
console.log(__dirname)
//경로 + 파일명
console.log(__filename)
*/

const app = express()

//****************** 경로 설정 시작 ******************

//각 폴더의 경로 설정(path 모듈 사용)
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//hbs 엔진 사용, 뷰,partial path 설정
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//정적 파일의 경로 설정
app.use(express.static(publicDirectoryPath))

//****************** 경로 설정 끝******************
//****************** 라우팅 시작 ******************

app.get('', (req, res)=>{
  res.render('index', {
    title: '지금날씨',
    name: 'Henry Hwang',
  })
})

app.get('/about', (req,res)=>{
  res.render('about',{
    fotitlerecast: 'About Me',
    title: '제작자',
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