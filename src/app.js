const path = require('path')
const express = require('express')
const hbs = require('hbs')


const chalk = require('chalk');

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')



const app = express()

const port = process.env.PORT || 3001






// define paths for express config

const public_dir_path = path.join(__dirname,'../public')
const views_path = path.join(__dirname,'../templates/views')
const partials_path = path.join(__dirname,'../templates/partials')


//setup handdlebars engine an view locations
app.set('view engine','hbs')
app.set('views',views_path)
hbs.registerPartials(partials_path)

//setup static directory to serve 
app.use(express.static(public_dir_path))

app.get('',(req,res)=>{
    res.render('index',{
        tittle: 'Weather',
        name: 'Daniel D..'
    })
})


app.get('/About',(req,res)=>{
    res.render('About',{
        tittle: 'About',
        name: 'Daniel D.'
    })
})


//app.com
//app.com/help
//app.com/about



app.get('/weather',(req,res)=>{

    if(!(req.query.address)){
    return res.send({
        error: 'you must provide address'
    })
    }
    
    const ad = req.query.address

    geocode(ad,(error,{latitude,longitude,location}={}) =>{
        if(error){
            return res.send({
                error: error
            })
        }
        
        forecast(latitude,longitude, (error, forecastData) => {
    
            if(error){
                return res.send({
                    error: error
                })
            }
    
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    
    })
    
    
    

   
})


app.get('/propuesta',(req,res)=>{

    res.render('Propuesta',{
        tittle: 'Propuesta',
        name: 'Daniel D'
    })
})

app.get('/products',(req,res)=>{

    if(!(req.query.search)){
       return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help',(req,res)=>{
    res.render('HELP',{
        helpText: 'help page ',
        tittle: 'help',
        name: 'Daniel D'

    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        tittle: '404',
        name: 'Daniel D',
        error_message: 'HELP ARTICLE NOT FOUND'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        tittle: '404',
        name: 'Daniel D',
        error_message: 'PAGE NOTE FOUND'
    })
})

app.listen(port,()=>{
    console.log('Server is up port '+port)
})