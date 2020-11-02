const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express() 
const port = process.env.PORT || 3000 




const publicpath= path.join(__dirname, '../public')
const pathview = path.join(__dirname, '../template/views')
const pathpartial = path.join(__dirname, '../template/partial')


app.set('view engine' , 'hbs')
app.set('views' , pathview)
app.use(express.static(publicpath))
hbs.registerPartials(pathpartial)



app.get('', (req, res) =>{
res.render('index' ,{
     name: 'Rossi',
     job: 'developer',
     title: 'Weather app'
})
})


app.get('/about' , (req, res) => {
    res.render('about', ({
        title: 'About',
        name: 'Rossi'
    })
)})


app.get('/help' , (req, res) =>{
    res.render('help', ({
        title: 'Help',
        name: 'Rossi'
    }))
})

app.get('/weather' , (req, res) =>{

   if(!req.query.search){
      return res.send({error: 'you must put an address'})
   }



geocode(req.query.search, (error,{latitude, longitude, location}={}) => {
if(error){
   return res.send({ error})
}
forecast(latitude,longitude,(error,dataForecast)=>{
if(error){ return res.send({error})}

res.send({

    forecast: dataForecast,
    location,
    address: req.query.search
 })

})


})

    
})


app.get('/products',(req,res)=>{
if(!req.query.search){
    return res.send('error: Type a right address please! ')
}

res.send({
    product:[]
})
})




app.get('/help/*',(req, res)=>{
    res.render('404', ({
    title:'404',
    name:'Rossi',
    errorMessage: 'Searched page not found'

    }))
})

app.get('/*', (req,res)=>{

    res.render('404',({
      title:'404',
      name:'Rossi',
      errorMessage:'Searched page not found'

    }))
})



app.listen(port,()=>{
console.log('this is local port :'+ port)
})


