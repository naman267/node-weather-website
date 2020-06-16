const request=require('request')


const forecast=(exactlocation,callback)=>{
    const url='https://api.openweathermap.org/data/2.5/weather?q='+exactlocation+'&APPID=d9f8d157ff42a3183bbc9249eee8b53e'
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
  forecast:'Current temprature is-'+(body.main.temp)+' kelvin '+' ,Humidity is-'+body.main.humidity+" ,Today's Weather is-"+body.weather[0].main +" ,Maximum temp-"+body.main.temp_max+" kelvin ,Minimum temp is-"+body.main.temp_min +" kelvin ,It is "+body.clouds.all+"% cloudy" ,
                // temp:body.main.temp-273.15+' Degree celcius',
                // humidity:body.main.humidity,
                // weather:body.weather[0].main
                location:exactlocation

            })
        }
    })
}
module.exports=forecast
