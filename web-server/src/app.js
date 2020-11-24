const path = require("path")
const express = require("express")
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()
const port = process.env.PORT || 3000

// define path for Express Configuration
const publicDirectoryPath = path.join(__dirname,"../public")
const viewsPath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")

// Setup HandleBars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Setup Static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("",(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name:"Rahul"
    })
})
app.get("/about",(req,res)=>{
    res.render('about',{
        title:"About Me",
        name:"Rahul"

    })
    
})
app.get("/help",(req,res)=>{
    res.render('help',{
        title:"Help!!",
        help_text : "This is Some useful Text",
        name:"Rahul"
        

    })
    
})

app.get("/weather",(req,res)=>{
    if(!req.query.address){
       return res.send({
           error:"Without Address I Can't do anything"
       })
    }


    
    geocode(req.query.address,(err,{
        latitude,
         longitude,
        place
    } = {} )=>{
        if(err){
            return res.send({
                Error:err
            })
        }
        forecast(latitude,longitude,(err,forecast_data)=>{
            if(err){
                return res.send({
                    Error:err
                })
            }
            res.send({
                latitude:latitude,
                longitude:longitude,
                address:req.query.address,
                forecast_info : forecast_data
            })
            
        })
        
    })
    
})
app.get('/products',(req,res) =>{
    if(!req.query.search){
        return res.send("Please provide the Search")

    }
    console.log(req.query.rating)
    res.send({
        products:[]
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name: "Rahul",
        errorMessage: "Help Article Not Found"
    })

})


app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name: "Rahul",
        errorMessage: "Page Not Found"
    })

})

app.get('/testing',(req,res)=>{
    res.send("hello")
})

app.listen(port,()=>{
    console.log("Server is up on " + port)
})
