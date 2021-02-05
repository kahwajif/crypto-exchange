const mongoose = require('mongoose');

//connect to mongodb
mongoose.connect('mongodb://localhost:27017');

mongoose.connection.once('open', function(){
    console.log("connection successfull!");
}).on('error', function(error){
    console.log('Connection error:', error);
});