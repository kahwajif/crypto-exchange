const express = require('express');

const app = express();

//Routes
app.get('/', (req,res)=>{
  res.send('we are on home');
})

//Listening to the server
app.listen(3000);
