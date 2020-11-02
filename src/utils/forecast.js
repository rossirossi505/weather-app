const request = require('request')



const forecast = (lati, longi, callback) => {
const url = 'https://api.darksky.net/forecast/0d835eb38328940b5f708fcfbe583581/'+lati+','+longi+'?units=si'
    request({ url : url, json : true}, (error, {body}) => {
if(error){
    callback(' unable to provide the service ! ', undefined)
} else if(body.error){
   callback(' something went wrong! ', undefined)
}else{
callback(undefined, ' The current temperature is: ' + ' ' + body.currently.temperature+ ' ' + 'and Threre is '+' '+ body.currently.precipProbability *100+ '%' +' '+'chance of  rain' +' '+'. And the pressure is: '+ ' '+ body.currently.pressure)
}
}) 
}

module.exports = forecast 
