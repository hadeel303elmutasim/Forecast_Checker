require('dotenv').config();
const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();
const PORT = process.env.PORT || 3000;

const publicDirectory =  path.join(__dirname , './public')
    app.use (express.static (publicDirectory))

// Set up Handlebars View Engine
app.set('view engine', 'hbs');
 const viewsDirectory = path.join (__dirname , './views')
 app.set('views', viewsDirectory);

// Route: Transferring data from app.js to index.hbs
app.get('/', (req, res) => {
    // Simulated data (like electronic products)
     res.render('index' , { 
        title: "Forecast Page"
    });

});
// ///////////////////////////////////////////////////////////////
const geocode = require('./data/geocode')
const forecast = require('./data/forecast')
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide address'
        })
    }
    geocode(req.query.address,(error,data)=>{
        if(error){
            // shorthand property error:error
            return res.send({error})
        }
        forecast(data.latitude,data.longtitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location: req.query.address,
                condition: forecastData.condition,
                temp: forecastData.temp,
                icon: forecastData.icon 
            })
        })
    })
})
app.get('*any' , (req , res)=> {
     res.send('404 Page Not Founded')
  })

app.listen(PORT, () => {
    console.log(`Server is running smoothly on http://localhost:${PORT}`);
});

  