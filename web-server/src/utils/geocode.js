const request = require("request")
const geocode= (address,callback)=>{
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicmFodWxtYWh0b2FwaSIsImEiOiJja2Y0eGE0ZXMwaGUwMzNrdWoyaGh4eGpkIn0.RQxgnUv_tLavNl9Ee9EqJQ&limit=1`


    request({url, json:true},(error,{body} ={}) =>{
        if (error){
            callback("Unable to connect to services",undefined)
        }
        else if(body.features.length === 0){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude: body.features[0].center[0],
                place: body.features[0].place_name
            })
        }
       
   
            })
}

module.exports= geocode