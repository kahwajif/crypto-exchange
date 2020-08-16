import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'
import { fromEventPattern } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-bitcoinCard',
  templateUrl: './bitcoinCard.component.html',
  styleUrls: ['./bitcoinCard.component.css']
})

export class BitcoinCardComponent implements OnInit{
  crypto: any;
  USD: any;

  //for buy/sell inputs
  USD1: number;;
  BTC1: number;;
  USD2: number;;
  BTC2: number;;

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
      var year = date.getFullYear();
      var month = months_arr[date.getMonth()];
      var day = date.getDate();
      var realDate = month +' '+ day;
      return realDate;
    }

    //get BTC historical data
    async function getData(){
      let historicData;
      let historicX = [];
      let historicY = [];
      let historicTime = [];
      const res = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=30&api_key=621def888ea82cbdd98c3ba9f10fbd487e222c0663c524f468b1c3495192cb89');
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
      return {historicTime, historicY};
    }

    async function chartIt(){
      const data = await getData();
      const chart = new Chart('myChart', {
        type: "line",
        data: {
          labels: data.historicTime,
          datasets: [
            {
              label: "Bitcoin",
              pointRadius: 2,
              pointBorderWidth: 2,
              pointBackgroundColor: "#eea231",
              borderWidth: '1',
              borderColor: "#eea231",
              data: data.historicY
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
                  callback: function(value, index, values) {
                    return '$' + value;
                }
                }
              }
            ]
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


  get result1BTC(){
    return Number(this.USD1*this.crypto);
    //check if funds are insufficient or amount exceeds limit(spending too much). Check NDAX
  }
  get result1USD(){
    return Number(this.BTC1*this.USD).toFixed(2);
  }
  get result2BTC(){
    return Number(this.USD2*this.crypto).toFixed(8);
  }
  get result2USD(){
    return Number(this.BTC2*this.USD).toFixed(2);
  }

}
