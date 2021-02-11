import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js'
import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { environment } from 'src/environments/environment';

const API_KEY = environment.API_KEY;
@Injectable({
  providedIn: 'root'
})
export class DataService {
  result:any;
  constructor(private _http: HttpClient) {

  }
  //price of ETH and BTC in USD
  getPricesInUSD(){
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,DOGE&tsyms=USD&api_key='+API_KEY)
    .pipe(map(result => this.result = result));
  }
  //price of USD in ETH and BTC
  getPriceInCrypto(){
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH,DOGE&api_key='+ API_KEY)
    .pipe(map(result => this.result = result));
  }


  convertTime(UNIX_time){
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var date = new Date(UNIX_time*1000);
    var year = date.getFullYear();
    var month = months_arr[date.getMonth()];
    var day = date.getDate();
    
    var realDate = month +' '+ day + ' ' + year;
    return realDate;
  }


  //===============================================BTC START===================================================
  async getBTC(){
    let historicData;
    let historicX = [];
    let historicY = [];
    let historicTime = [];
    let historicYears = [];
    let monthHistoricY =[];
    let monthHistoricTime = [];
    let yearHistoricTime = [];
    let yearHistoricY = [];
    const res = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1825&api_key='+API_KEY);
    const data = await res.json();
    historicData = data.Data.Data;
    //5 years
    for (let value of historicData){
      historicX.push(value.time);
      historicY.push(value.close);
    }
    for(let UNIX_time of historicX){
      var s = this.convertTime(UNIX_time);
      historicTime.push(s);
    }
    //5 year time
    for(let i=0;i<1825;i++){
      var removeDay = historicTime[i].substring(historicTime[i].indexOf(" "), historicTime[i].lastIndexOf(" "));
      var corrected = historicTime[i].replace(removeDay, "");
      historicYears.push(corrected);
    }
    //1 year
    for(let i=0;i<365;i++){
      yearHistoricY.push(historicY[1460+i])
      var removeDay = historicTime[1460+i].substring(historicTime[1460+i].indexOf(" "), historicTime[1460+i].lastIndexOf(" "));
      var corrected = historicTime[1460+i].replace(removeDay, "");
      yearHistoricTime.push(corrected);
    }

    //1 month
    for(let i=0;i<30;i++){
      monthHistoricY.push(historicY[1795+i])
      monthHistoricTime.push(historicTime[1795+i].substring(0, historicTime[1795+i].lastIndexOf(" ")));
    }

    return {monthHistoricTime, monthHistoricY, historicY, historicYears, yearHistoricTime, yearHistoricY};
  }

  async bitcoinChart(x){
    const data = await this.getBTC();
    let currentTime, currentY;

    var chart = new Chart('myChart', {
      type: "line",
      data: {
        labels: currentTime,
        datasets: [
          {
            label: "Bitcoin",
            pointRadius: 3,
            pointBorderWidth: 1,
            pointBackgroundColor: "#eea231",
            borderWidth: '1',
            borderColor: "#eea231",
            fontColor: 'white',
            defaultFontSize: 20,
            data: currentY
          }
        ]
      },
      options: {
        elements: {
          point: {
            radius: 0,
            hitRadius: 5,
            hoverRadius: 5
          }
        },
        legend: {
          display: false
        },
        scales: {
          yAxes: [
            {
              display: true,
              position: 'right',
              ticks: {
                beginAtZero: false,
                fontSize: 15,
                fontColor: 'white',
                callback: function(value, index, values) {
                  return '$' + value;
                }
              },
            }
          ],
          xAxes: [
            {
              gridLines:{
                display: false
              },
              ticks: {
                autoSkipPadding: 20,
                fontColor: 'white',
                fontSize: 15,
                maxRotation: 0,
                minRotation: 0,
                
              }
            }
          ],
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        }
      }
    });
    
    function updateChart(x){
      if(x == 1){ //month
        
        chart.data.datasets[0].data = data.monthHistoricY;
        chart.data.labels = data.monthHistoricTime;
      }
      else if(x == 2){ //1 year
        chart.data.datasets[0].data = data.yearHistoricY;
        chart.data.labels = data.yearHistoricTime;
        chart.data.datasets[0].pointRadius = 0;
      }
      else if(x == 3){ // 5 years

        chart.data.datasets[0].data = data.historicY;
        chart.data.labels = data.historicYears;
        chart.data.datasets[0].pointRadius = 0;
      }
      chart.update();
    }
    updateChart(x);
  }
 //===============================================BTC END===================================================
 //===============================================ETH START=================================================
 async getETH(){
  let historicData;
  let historicX = [];
  let historicY = [];
  let historicTime = [];
  let historicYears = [];
  let monthHistoricY =[];
  let monthHistoricTime = [];
  let yearHistoricTime = [];
  let yearHistoricY = [];
  const res = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=1825&api_key='+API_KEY);
  const data = await res.json();
  historicData = data.Data.Data;
  //5 years
  for (let value of historicData){
    historicX.push(value.time);
    historicY.push(value.close);
  }
  for(let UNIX_time of historicX){
    var s = this.convertTime(UNIX_time);
    historicTime.push(s);
  }
  //5 year time
  for(let i=0;i<1825;i++){
    var removeDay = historicTime[i].substring(historicTime[i].indexOf(" "), historicTime[i].lastIndexOf(" "));
    var corrected = historicTime[i].replace(removeDay, "");
    historicYears.push(corrected);
  }
  //1 year
  for(let i=0;i<365;i++){
    yearHistoricY.push(historicY[1460+i])
    var removeDay = historicTime[1460+i].substring(historicTime[1460+i].indexOf(" "), historicTime[1460+i].lastIndexOf(" "));
    var corrected = historicTime[1460+i].replace(removeDay, "");
    yearHistoricTime.push(corrected);
  }

  //1 month
  for(let i=0;i<30;i++){
    monthHistoricY.push(historicY[1795+i])
    monthHistoricTime.push(historicTime[1795+i].substring(0, historicTime[1795+i].lastIndexOf(" ")));
  }

  return {monthHistoricTime, monthHistoricY, historicY, historicYears, yearHistoricTime, yearHistoricY};
 } 

 async ethereumChart(x){
  const data = await this.getETH();
  let currentTime, currentY;

  var chart = new Chart('ethChart', {
    type: "line",
    data: {
      labels: currentTime,
      datasets: [
        {
          label: "Ethereum ",
          pointRadius: 3,
          pointBorderWidth: 1,
          pointBackgroundColor: "#0db1c0",
          borderWidth: '1',
          borderColor: "#0db1c0",
          fontColor: 'white',
          defaultFontSize: 20,
          data: currentY
        }
      ]
    },
    options: {
      elements: {
        point: {
          radius: 0,
          hitRadius: 5,
          hoverRadius: 5
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            display: true,
            position: 'right',
            ticks: {
              beginAtZero: false,
              fontSize: 15,
              fontColor: 'white',
              callback: function(value, index, values) {
                return '$' + value;
              }
            },
          }
        ],
        xAxes: [
          {
            gridLines:{
              display: false
            },
            ticks: {
              autoSkipPadding: 20,
              fontColor: 'white',
              fontSize: 15,
              maxRotation: 0,
              minRotation: 0,
              
            }
          }
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    }
  });
  
  function updateChart(x){
    if(x == 1){ //month
      
      chart.data.datasets[0].data = data.monthHistoricY;
      chart.data.labels = data.monthHistoricTime;
    }
    else if(x == 2){ //1 year
      chart.data.datasets[0].data = data.yearHistoricY;
      chart.data.labels = data.yearHistoricTime;
      chart.data.datasets[0].pointRadius = 0;
    }
    else if(x == 3){ // 5 years

      chart.data.datasets[0].data = data.historicY;
      chart.data.labels = data.historicYears;
      chart.data.datasets[0].pointRadius = 0;
    }
    chart.update();
  }
  updateChart(x);
 }
 //===============================================ETH END===================================================
 //===============================================DOGE START================================================
 async getDOGE(){
  let historicData;
  let historicX = [];
  let historicY = [];
  let historicTime = [];
  let historicYears = [];
  let monthHistoricY =[];
  let monthHistoricTime = [];
  let yearHistoricTime = [];
  let yearHistoricY = [];
  const res = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=DOGE&tsym=USD&limit=1825&api_key='+API_KEY);
  const data = await res.json();
  historicData = data.Data.Data;
  //5 years
  for (let value of historicData){
    historicX.push(value.time);
    historicY.push(value.close);
  }
  for(let UNIX_time of historicX){
    var s = this.convertTime(UNIX_time);
    historicTime.push(s);
  }
  //5 year time
  for(let i=0;i<1825;i++){
    var removeDay = historicTime[i].substring(historicTime[i].indexOf(" "), historicTime[i].lastIndexOf(" "));
    var corrected = historicTime[i].replace(removeDay, "");
    historicYears.push(corrected);
  }
  //1 year
  for(let i=0;i<365;i++){
    yearHistoricY.push(historicY[1460+i])
    var removeDay = historicTime[1460+i].substring(historicTime[1460+i].indexOf(" "), historicTime[1460+i].lastIndexOf(" "));
    var corrected = historicTime[1460+i].replace(removeDay, "");
    yearHistoricTime.push(corrected);
  }

  //1 month
  for(let i=0;i<30;i++){
    monthHistoricY.push(historicY[1795+i])
    monthHistoricTime.push(historicTime[1795+i].substring(0, historicTime[1795+i].lastIndexOf(" ")));
  }

  return {monthHistoricTime, monthHistoricY, historicY, historicYears, yearHistoricTime, yearHistoricY};
  }

 async dogeChart(x){
  const data = await this.getDOGE();
  let currentTime, currentY;

  var chart = new Chart('dogeChart', {
    type: "line",
    data: {
      labels: currentTime,
      datasets: [
        {
          label: "Dogecoin ",
          pointRadius: 3,
          pointBorderWidth: 1,
          pointBackgroundColor: "#f4a460",
          borderWidth: '1',
          borderColor: "#f4a460",
          fontColor: 'white',
          defaultFontSize: 20,
          data: currentY
        }
      ]
    },
    options: {
      elements: {
        point: {
          radius: 0,
          hitRadius: 5,
          hoverRadius: 5
        }
      },
      legend: {
        display: false
      },
      scales: {
        yAxes: [
          {
            display: true,
            position: 'right',
            ticks: {
              beginAtZero: false,
              fontSize: 15,
              fontColor: 'white',
              callback: function(value, index, values) {
                return '$' + value;
              }
            },
          }
        ],
        xAxes: [
          {
            gridLines:{
              display: false
            },
            ticks: {
              autoSkipPadding: 20,
              fontColor: 'white',
              fontSize: 15,
              maxRotation: 0,
              minRotation: 0,
              
            }
          }
        ],
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    }
  });
  
  function updateChart(x){
    if(x == 1){ //month
      
      chart.data.datasets[0].data = data.monthHistoricY;
      chart.data.labels = data.monthHistoricTime;
    }
    else if(x == 2){ //1 year
      chart.data.datasets[0].data = data.yearHistoricY;
      chart.data.labels = data.yearHistoricTime;
      chart.data.datasets[0].pointRadius = 0;
    }
    else if(x == 3){ // 5 years

      chart.data.datasets[0].data = data.historicY;
      chart.data.labels = data.historicYears;
      chart.data.datasets[0].pointRadius = 0;
    }
    chart.update();
  }
  updateChart(x);
  }
  //===============================================DOGE END==================================================
  
} 
