const request = require('request');
const chalk = require('chalk')

const foreCast = (alt,lat,callback)=>{
    const url ='https://api.darksky.net/forecast/1e5a0b0e0f3ea7d629197a135579a845/'+alt+','+lat+'?units=si'


    request({url,json:true},(error,{body})=>{
        if(error){
            callback('unable to connect to location services!',undefined)
        }else if(body.error){
            callback('unable to find location!',undefined)
           }else{


            /* callback(undefined,{
                 wather: response.body.currently.temperature,
                 prob: response.body.currently.precipProbability,
                 summary: response.body.daily.data[0].summary

            })*/
                const wather = body.currently.temperature
                const prob = body.currently.precipProbability
                const summary = body.daily.data[0].summary
                const high = body.daily.data[0].temperatureHigh
                const low = body.daily.data[0].temperatureLow
                callback(undefined,summary +'\n'+ 'It is currently: '+wather+ ' °C' +'\n'+'with a high of '+high  + '\n'+ 'a low of ' + low +'\n'+ 'The probabiliti of rain is: '+ prob + '% chance of rain')
        
           }

    })
}

module.exports = foreCast