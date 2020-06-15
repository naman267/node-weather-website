const request=require('request')


const forecast=(exactlocation,adderes,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?q='+adderes+'&APPID=d9f8d157ff42a3183bbc9249eee8b53e'
    request({url,json:true},(error,{body})=>{
        if(error)
        {
            callback('Please Check Your Network Connection');
        }
        else if(body.message)
        {
            callback(body.message)
        }
        else
        {
            callback(undefined,{
  forecast:'Current temprature is-'+(body.main.temp-273.15)+'deg '+' Humidity is-'+body.main.humidity+' Weather is-'+body.weather[0].main,
                // temp:body.main.temp-273.15+' Degree celcius',
                // humidity:body.main.humidity,
                // weather:body.weather[0].main
                location:exactlocation

            })
        }
    })
}
module.exports=forecast