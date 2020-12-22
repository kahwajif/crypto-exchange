import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js'
import { DataService } from 'src/app/services/data.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-bitcoinCard',
  templateUrl: './bitcoinCard.component.html',
  styleUrls: ['./bitcoinCard.component.css']
})

export class BitcoinCardComponent implements OnInit{
  chart: any;
  crypto: any;
  USD: any;

  //for buy/sell inputs
  USD1: number;;
  BTC1: number;;
  USD2: number;;
  BTC2: number;;

  canvas1: boolean;
  canvas2: boolean;
  canvas3: boolean;

  constructor(private _data:DataService){
  }

  ngOnInit(){

    //get ETH current price data
    this._data.getPricesInUSD()
      .subscribe(res=>{
        this.crypto = res['BTC'].USD;
    });
    // get USD in ETH
    this._data.getPriceInCrypto()
      .subscribe(res=>{
        this.USD = res['BTC'];
    });

    //console.log(this.historicX,this.historicY)

    function convertTime(UNIX_time){
      var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      var date = new Date(UNIX_time*1000);
      //var year = date.getFullYear();
      var month = months_arr[date.getMonth()];
      var day = date.getDate();
      var realDate = month +' '+ day;//+year
      return realDate;
    }

    //get BTC historical data
    async function getData(){
      let historicData;
      let historicX = [];
      let historicY = [];
      let historicTime = [];

      let monthHistoricY =[];
      let monthHistoricTime = []
      const res = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1825&api_key=621def888ea82cbdd98c3ba9f10fbd487e222c0663c524f468b1c3495192cb89');
      const data = await res.json();
      historicData = data.Data.Data;
      //5 years
      for (let value of historicData){
        historicX.push(value.time);
        historicY.push(value.close);
      }
      for(let UNIX_time of historicX){
        var s = convertTime(UNIX_time);
        historicTime.push(s);
      }
      //1 month
      for(let i=0;i<30;i++){
        monthHistoricY.push(historicY[1795+i])
        monthHistoricTime.push(historicTime[1795+i])
      }
      console.log(monthHistoricY)

      return {monthHistoricTime, monthHistoricY, historicTime, historicY};
    }
    async function chartIt(){
      const data = await getData();
      const chart = new Chart('myChart', {
        type: "line",
        data: {
          labels: data.monthHistoricTime,
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
              data: data.monthHistoricY
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
    }

    chartIt();
  }


  //converts USD to BTC and vice versa
  get result1USD(){
    return Number(this.USD1*this.USD);
  }
  get result1BTC(){
    return Number(this.BTC1*this.crypto);
  }
  get result2BTC(){
    return Number(this.USD2*this.crypto);
  }
  get result2USD(){
    return Number(this.BTC2*this.USD);
  }

  check1: boolean;
  check2: boolean;
  checkAmount1(){
    this.checkNegative();
    if(this.USD1 < 0 || this.BTC1 < 0){
      this.USD1 = 0;
      this.BTC1 = 0
    }
    else if(this.USD1 > 100000 || this.BTC1 > 99){
      this.check2 = true;
      this.check1 = false;
    }
    else if(this.USD1 || this.BTC1){
      this.check1 = true;
      this.check2 = false;
    }
    else
      return 0;
    return 1;
  }

  check3: boolean;
  check4: boolean;
  checkAmount2(){
    this.checkNegative();
    if(this.USD2 > 100000 || this.BTC2 > 99){
      this.check4 = true;
      this.check3 = false;
    }
    else if(this.USD2 || this.BTC2){
      this.check3 = true;
      this.check4 = false;
    }
    else
      return 0;
    return 1;
  }

  checkNegative(){
    var a = document.getElementById('defaultInput');
    var b = document.getElementById('buyInput');
    var c = document.getElementById('sellInput');
    var d = document.getElementById('defaultInput2');

    a.onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
          return false;
      }
    }
    b.onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
          return false;
      }
    }
    c.onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
          return false;
      }
    }
    d.onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58)
        || e.keyCode == 8)) {
          return false;
      }
    }
  }

}
