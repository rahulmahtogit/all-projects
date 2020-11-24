const request = require("request")
const geocode = require('../web-server/src/utils/geocode')
const yargs = require("yargs")
const forecast = require("../web-server/src/utils/forecast")

const address = process.argv[2]
if(!address){
    console.log("Please provide the address")

}
else{
    geocode(address,(err,{
        latitude,
         longitude,
        place
    } = {} )=>{
        if(err){
            return console.log(err)
        }
        forecast(latitude,longitude,(err,forecast_data)=>{
            if(err){
                return console.log(err)
            }
            console.log(latitude)
            console.log(forecast_data)
        })
        
    })
    
}



yargs.parse()

