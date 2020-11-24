const weatherForm = document.querySelector('form') 
const search = document.querySelector("input")
const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")
// messageOne.textContent = "From Javascript"



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    messageOne.textContent = "Loading..."
    messageTwo.textContent = ""
  

fetch(`/weather?address=${location}`,
).then((response) =>{
    response.json().then(data=>{
        
        if (data.error){
            messageOne.textContent = data.error  
        }
        else{
            messageOne.textContent = `Location : ${data.forecast_info.loc_name} ${data.forecast_info.loc_region} ${data.forecast_info.loc_country} Localtime:${data.forecast_info.curr_time}`

            w_info = `Current Temperature: ${data.forecast_info.temp} celicus  Weather Description: ${data.forecast_info.weat_des}  Chance of rain : ${data.forecast_info.prec} Percent` 


        messageTwo.textContent = w_info
        }
        
    })
})

})