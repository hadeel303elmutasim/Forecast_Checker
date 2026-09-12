const request = require("request")
const forcast = (latitude , longtitude, callback) => {
     const url = "http://api.weatherapi.com/v1/current.json?key=" + process.env.WEATHER_API_KEY + "&q=" + latitude + "," + longtitude;
    request({ url, json: true }, (error, response) => {
        if (error) {
            callback("Unable to connect to the weatherapi server", undefined)
        } else if (response.body.error) {
            callback(response.body.error.message, undefined)
        } else {
           callback(undefined, {
                country: response.body.location.country,
                condition: response.body.current.condition.text,
                temp: response.body.current.temp_c,
                icon: "https:" + response.body.current.condition.icon
            });
        }
    })
}
module.exports = forcast
