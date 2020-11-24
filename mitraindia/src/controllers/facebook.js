const express = require('express')
const queryString = require('query-string');
const axios = require('axios')

exports.facebookLogin = (req,res)=>{
    const stringifiedParams = queryString.stringify({
        client_id: "1455600347975751",
        redirect_uri: 'http://localhost:3007/authenticate/facebook/',
        scope: ['email', 'user_friends'].join(','), // comma seperated string
        response_type: 'code',
        auth_type: 'rerequest',
        display: 'popup',
      });
      // console.log(location.search)
      
      const facebookLoginUrl = `https://www.facebook.com/v8.0/dialog/oauth?${stringifiedParams}`;
        res.redirect(facebookLoginUrl)

      
      

}

// Pass the code and get the token through this api
exports.facebookAuth =  async (req,res)=>{
    let user = req.user
        // res.send(req.query.code)
         const {token } = await axios({
          url: 'https://graph.facebook.com/v8.0/oauth/access_token',
          method: 'get',
          params: {
            client_id: "1455600347975751",
            client_secret: "0a80e10646fffb308b93a9f12b81e2fa",
            redirect_uri: 'http://localhost:3007/authenticate/facebook/',
            code:req.query.code,
          },
        })
        user.facebook_data.access_token = token.access_token
        await user.save()
        // console.log(data)
        // var encodData = encodeURIComponent(data.access_token);
        res.status(200).send(token)
        // res.redirect(`/getfbToken?newdata=${encodData}`)  
      }


exports.getFBData = async (req,res)=>{
        
        const { data } = await axios({
          url: 'https://graph.facebook.com/me',
          method: 'get',
          params: {
            fields: ['id', 'email', 'first_name', 'last_name'].join(','),
            access_token: "EAAUr3F2tEEcBAPGcXMK237bEo2m218ISQMs3rcnrKgZA5oB9C5LhLrvHJKCZBCDbP3mL8YZCSjZBP0ZCymadyhHE7Flpise2yeZChyZAOhV1FreTFWWk3tbq0cMczl5cgVySL5P56PFZBc6AbmaM4bET4RawU0eBPk3xwlvQlV2GHv99ZBMNk16O2DU4vdgbqgydOnAErlk2nM7CxcLlfWZBr1mQOzp4SSOkEZD",
          },
        });
        res.send(data)
      }

    //   exports.getFBPageData = async (req,res)=>{
        
    //     const { pagedata } = await axios({
    //       url: 'https://graph.facebook.com/107135984531365/accounts',
    //       method: 'get',
    //       params: {
    //         fields: [].join(','),
    //         access_token: "EAAUr3F2tEEcBAPGcXMK237bEo2m218ISQMs3rcnrKgZA5oB9C5LhLrvHJKCZBCDbP3mL8YZCSjZBP0ZCymadyhHE7Flpise2yeZChyZAOhV1FreTFWWk3tbq0cMczl5cgVySL5P56PFZBc6AbmaM4bET4RawU0eBPk3xwlvQlV2GHv99ZBMNk16O2DU4vdgbqgydOnAErlk2nM7CxcLlfWZBr1mQOzp4SSOkEZD",
    //       },
    //     });
    //     res.send(pagedata)
    //   }
