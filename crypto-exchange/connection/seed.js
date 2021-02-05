const mongoose = require("mongoose");
const BtcHistorical = require("../models/btcHistorical");
const fetch = require('node-fetch');

let resultData;
let saveCounter = 0;

mongoose.connect("mongodb://localhost:27017")
.then(() => console.log("mongodb connection success"))
.catch(error => console.log(error));
const api = ['621def888ea82cbdd98c3ba9f10fbd487e222c0663c524f468b1c3495192cb89']
const url = ['https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1825&api_key=' + api]




function convertTime(UNIX_time){
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(UNIX_time*1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    var realDate = month +' '+ day +' ' +year;
    return realDate;
  }

//get BTC historical data
async function getData(){
    //5 years
    let historicData;
    let historicX = [];
    let historicY = [];
    let historicTime = [];

    const res = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1825&api_key=621def888ea82cbdd98c3ba9f10fbd487e222c0663c524f468b1c3495192cb89');
    const data = await res.json();
    historicData = data.Data.Data;
    
    for (let value of historicData){
      historicX.push(value.time);
      historicY.push(value.close);
    }
    for(let UNIX_time of historicX){
      var s = convertTime(UNIX_time);
      historicTime.push(s);
    }
    

    for( let i = 0; i < 1825;i++){
      let btcHistorical = new BtcHistorical({
        _id: new mongoose.Types.ObjectId(),
        time: historicTime[i],
        price: historicY[i],
      })

      btcHistorical.save(()=>{
        console.log("saved" + btcHistorical);
        saveCounter++;
        // if(saveCounter === resultData.length){
        //   mongoose.disconnect()
        //   .then(()=> console.log("saved successfully & disconnected mongodb"))
        //   .catch(error=>console.log(error));
        // }
      });

    }
    mongoose.disconnect()
    .then(()=> console.log("saved successfully & disconnected mongodb"))
    .catch(error=>console.log(error));

    
  }
  getData();