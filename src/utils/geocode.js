const request = require('request')
const data = require('./../data')

const geocode = (address, callback) =>{
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${encodeURIComponent(data.mapboxToken)}`
  request({url, json: true}, (error, {body})=>{
    if(error){
      callback(`Unable to connect to Internet : ${error}`, undefined)
    }
    else if(body.features.length === 0){
      callback(`Unable to find location. Try another search`, undefined)
    }else{
      console.log(body.features[0])
      callback(undefined, {
        latitude: body.features[0].center[0],
        longitude: body.features[0].center[1],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode