const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
console.log(__dirname)
console.log(path.join(__dirname,'../public'))
const app=express()

//define path for express config
const port=process.env.PORT || 3000
const temp=path.join(__dirname,'../public')
const viewpath=path.join(__dirname,'../templates/views')
const partialpath=path.join(__dirname,'../templates/partials')


//setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)

//setup  static directory to search
 app.use(express.static(temp))
 app.get('',(req,res)=>{
     res.render('index',{
         title:'Weather app',
         name:'naman'
     });
 })
 app.get('/about',(req,res)=>{
     res.render('about',{
         title:'About Me',
         name:'Naman jain'
     })
 })
 app.get('/help',(req,res)=>{
     res.render('help',{
         message:'Tell whatever is your concern',
         title:'Help',
         name:'Naman'
     })
 })
 app.get('/weather',(req,res)=>{
     if(!req.query.address)
     {
         return res.send({
             error:'You Must Provide Adderss'
         })
     }
     const address=req.query.address
     geocode(address,(error,{exactlocation}={})=>{
         
       if(error)
        {  console.log(error)
            return res.send({
                error:error
            })
        }
        forecast(exactlocation,(error,response)=>{
            if(error)
            {
                return res.send({
                    error:error
                })
            }
            
           return  res.send(response)
        })
    
    })
    

    //  res.send({
    //      forecast:'forecast',
    //      location:'Philidophia',
    //      adderess:req.query.adderess
    //  })
 })
 app.get('/products',(req,res)=>{
     if(!req.query.search)
     {
        return res.send({
             error:'Search item must be provided'
         })
     }
     res.send({
         products:[]
     })
 })
 app.get('/help/*',(req,res)=>{
     res.render('error',{
         title:'health 404',
         message:'Health article not found',
         name:'Naman'
     })
 })
 app.get('*',(teq,res)=>{
     res.render('error',{
         title:'404',
         message:'MY ERROR PAGE',
         name:'Naman'
     })
 })
app.listen(port,()=>{
    console.log('server is up on port '+port)//tells that server is runnning
})