const express = require('express')

const app = express();

app.get('/',(req,res)=>{
    res.send('Hello from server!')
})


app.get('/about',(req,res)=>{
    res.send('Hello from server from about page!' + 'Hey !' + `${req.query.name}`)
})


app.listen(8000,()=>{
    console.log('Server started !')
})