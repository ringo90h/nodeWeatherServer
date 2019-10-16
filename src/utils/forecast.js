/* 
forcast = 위도와 경도를 받아서 콜백함수에 결과물을 전달한다.
*/

const request = require('request')
const data = require('./../data')


const forecast = (latitude,longitude,callback)=>{
  const url = `https://samples.openweathermap.org/data/2.5/weather?lat=${encodeURIComponent(latitude)}&lon=${encodeURIComponent(longitude)}&appid=${encodeURIComponent(data.openweatherToken)}`
  request({url, json:true}, (err, {body})=>{
    if(err){
      callback('Unable to connect internet', undefined)
    }else if(body.error){
      callback('Unable to find location', undefined)
    }else{
      callback(undefined, 'It is currently '+ body.weather[0].description + ' ' + body.main.temp + ' degress out. There is a ' + body.wind.speed + ' wind speed.')
    }
  });
}

module.exports = forecast