const request = require("request")
const geocode = (country , callback) => {
    const gUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + country + ".json?access_token=" + process.env.MAPBOX_API_KEY;
    request({url:gUrl , json: true} , (error , response) =>{
        if(error) {
            callback("Unable to connect to the geocode server" , undefined)
        } else if (response.body.message) {
            callback(response.body.message , undefined)
        } else if (response.body.features.length == 0) {
            callback("Unable to Find your location please insert the correct address" , undefined)
        } 
        else {
          
            callback(undefined , {
                longtitude : response.body.features[0].center[0],
                latitude : response.body.features[0].center[1]
                
            })
        }     
    })
}
module.exports = geocode