const request = require('request')


const geocode = function(address, callback){

    const geocodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1Ijoicm9zczc3NyIsImEiOiJjanluY2RhNnowcWJoM251d2piM3BwaTJ6In0.Pd1UiopjYia_DKc6bwj5gQ&limit=1'
    request({ url : geocodeURL , json : true}, (error, {body}) => {
        if(error){
            callback('service unavailable', undefined)
        } else if(body.features.length === 0){
               callback('Something went wrong', undefined)
        }else{
             callback(undefined, 
                { latitude : body.features[0].center[0],
                  longitude : body.features[0].center[1],
                  location : body.features[0].place_name
                }) 
        
    }
    }) 
    }
    

    module.exports = geocode