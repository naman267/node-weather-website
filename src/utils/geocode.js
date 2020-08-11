 const request=require('request')
let body=undefined;
const geocode=(adderess,callback)=>{
const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adderess) +'.json?access_token=pk.eyJ1IjoibmFtYW4yNjciLCJhIjoiY2theHd6MXF0MDRpZDJ6bG5jM2gxamhhYyJ9.dvQEBN3b8IefZNG4Washlw&limit=1'
request({url,json:true},(error,response)=>{
        if(response)
        {
           body=response.body
        } 
       if(error)
        {
         callback('Unable to connect')
        }
        else if(body.features.length ===0)
        {
            callback('Unable To Find Location Try another Search',undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
               // location:body.features[0].context[0].text,
                exactlocation:body.features[0].place_name
   
   
            })
        }
    })
   }
  

   module.exports=geocode
   