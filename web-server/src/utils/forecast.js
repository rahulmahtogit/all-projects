const request = require("request")

const forecast = (lat,lon,callback) =>{
    
    const url = "http://api.weatherstack.com/current?access_key=e76766dc63131c01412b284db7650d38&query="+ lat +","+ lon
    request({url,json:true},(error,{body} = {})=>{
        
        if (error){
            callback("Unable to connect to services",undefined)
        }
        else if(body.error){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,{
                temp: body.current.temperature,
                curr_time:body.location.localtime,
                prec:body.current.precip,
                loc_name:body.location.name,
                loc_region:body.location.region,
                loc_country:body.location.country,
                weat_des:body.current.weather_descriptions[0]
        })
        }
    })
}
module.exports = forecast

