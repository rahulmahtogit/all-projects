const express = require('express')
const router = express.Router()
const {tokenAuth} = require('../middleware/auth')

const {
    google
  } = require('googleapis');


const oauthClient = new google.auth.OAuth2(
    "282685055817-787tvbdo3b09fokj3rqrtrviaahbcj9m.apps.googleusercontent.com",
    "OQtNwzwJc0gqf7CUPJQznY8F",
    "http://localhost:3007/auth/google"
)

//This API hit Login with google clicked
router.get('/youtubeLogin',(req,res)=>{
    
    const loginLink = oauthClient.generateAuthUrl(
        {access_type: "offline",
    scope: ['https://www.googleapis.com/auth/youtube.readonly']  
    }
    )
    res.redirect(loginLink)
    
})

router.get('/tokens', async (req,res)=>{
    oauthClient.getToken(req.query.code,function(err,token){
        if(err) return res.redirect('/youtubeLogin')
        
        // var encodData = encodeURIComponent(token);
        // res.redirect(`/subscriptionlist?newdata=${encodData}`)
        res.send(token)})
  
    // oauthClient.getToken(req.query.code,function(err,token){
    //                 if(err) return res.redirect('/googlelogin')
                    
    //                 // var encodData = encodeURIComponent(token);
    //                 // res.redirect(`/subscriptionlist?newdata=${encodData}`)
    //                 res.send(req.query.code)
    //             })


})

// // This API hit when loginLink genrated
router.get('/auth/google',tokenAuth,async (req,res)=>{
    if(req.query.error){
        // User didn't grant the permission
        return res.redirect('/youtubeLogin')
    }
    else{
        oauthClient.getToken(req.query.code,async function(err,token){
            if(err) return res.redirect('/youtubeLogin')
            req.user.youtube_token.access_token = token.access_token
            req.user.youtube_token.refresh_token = token.refresh_token
            await req.user.save() 
            // var encodData = encodeURIComponent(token);
            // res.redirect(`/subscriptionlist?newdata=${encodData}`)
            res.send(token)
        })
    }

})
router.get('/subscriptionlist',tokenAuth,(req,res)=>{
    let user = req.user
    oauthClient.credentials = {
        
        // access_token: 'ya29.A0AfH6SMCLl4ZwFTUYpDc93eht7DTA3s8T5e7QkvWNbVtG7TCJw27Q636_MfxSHqJUupwJjD25ybCIpjs_z1D98zIWysDQPwRTzKZCpLUDfEukeGmenJI8J7ubWgGjueCPP01e5Z2ZCmyM5FOGb7ps7yMP2KMsOEd59VxMMDvo8es',
        // refresh_token: '1//0gdaDMZdRJtRTCgYIARAAGBASNwF-L9IrrAG8JjTpyYYHt2oj9GmaNraVB5FPgKPmBKLWCpE5WgtxGdtqm_vcERKeM1vJYt1PK7A',
        access_token:user.youtube_token.access_token,
        refresh_token:user.youtube_token.refresh_token,
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        token_type: 'Bearer',
        expiry_date: true
      }
    //   You can pass the token through redirect
    // https://developers.google.com/youtube/v3/getting-started

 
    let service = google.youtube("v3")
    service.subscriptions.list({
        auth:oauthClient,
        mine:true,
        part: "snippet,contentDetails",
        maxResults:50

    }).then((response)=>{
        // console.log(response)
        res.send(response)

    })
})

router.get('/channels',tokenAuth,(req,res)=>{
    let user = req.user
    oauthClient.credentials = {
        
        // access_token: 'ya29.A0AfH6SMCLl4ZwFTUYpDc93eht7DTA3s8T5e7QkvWNbVtG7TCJw27Q636_MfxSHqJUupwJjD25ybCIpjs_z1D98zIWysDQPwRTzKZCpLUDfEukeGmenJI8J7ubWgGjueCPP01e5Z2ZCmyM5FOGb7ps7yMP2KMsOEd59VxMMDvo8es',
        // refresh_token: '1//0gdaDMZdRJtRTCgYIARAAGBASNwF-L9IrrAG8JjTpyYYHt2oj9GmaNraVB5FPgKPmBKLWCpE5WgtxGdtqm_vcERKeM1vJYt1PK7A',
        access_token:user.youtube_token.access_token,
        refresh_token:user.youtube_token.refresh_token,
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        token_type: 'Bearer',
        expiry_date: true
      }
    //   You can pass the token through redirect
    // https://developers.google.com/youtube/v3/getting-started

 let service = google.youtube("v3")
service.channels.list({
auth:oauthClient,
mine:true,
part: "statistics,contentDetails",
maxResults:50

}).then((response)=>{
// console.log(response)
res.send(response)

})
 
})    
router.get('/viewsOfVideos',tokenAuth,(req,res)=>{
    let user = req.user
    oauthClient.credentials = {
        
        // access_token: 'ya29.A0AfH6SMCLl4ZwFTUYpDc93eht7DTA3s8T5e7QkvWNbVtG7TCJw27Q636_MfxSHqJUupwJjD25ybCIpjs_z1D98zIWysDQPwRTzKZCpLUDfEukeGmenJI8J7ubWgGjueCPP01e5Z2ZCmyM5FOGb7ps7yMP2KMsOEd59VxMMDvo8es',
        // refresh_token: '1//0gdaDMZdRJtRTCgYIARAAGBASNwF-L9IrrAG8JjTpyYYHt2oj9GmaNraVB5FPgKPmBKLWCpE5WgtxGdtqm_vcERKeM1vJYt1PK7A',
        access_token:user.youtube_token.access_token,
        refresh_token:user.youtube_token.refresh_token,
        scope: 'https://www.googleapis.com/auth/youtube.readonly',
        token_type: 'Bearer',
        expiry_date: true
      }
    //   You can pass the token through redirect
    // https://developers.google.com/youtube/v3/getting-started

let auth = oauthClient;
const service = google.youtubeAnalytics({ version: "v2", auth });

service.reports
  .query({
    dimensions: "month",
    endDate: "2020-12-01",
    ids: "channel==MINE",
    metrics: "views,estimatedMinutesWatched,averageViewDuration,averageViewPercentage,subscribersGained",
    sort: "month",
    startDate: "2020-01-01"
  }).then((response)=>{
// console.log(response)
res.send(response)

})
 
}) 



module.exports = router