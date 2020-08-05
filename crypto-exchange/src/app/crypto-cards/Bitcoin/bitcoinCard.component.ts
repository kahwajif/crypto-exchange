import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart } from 'chart.js'
import { fromEventPattern } from 'rxjs';
import { async } from 'rxjs/internal/scheduler/async';

@Component({
  selector: 'app-bitcoinCard',
  templateUrl: './bitcoinCard.component.html',
  styleUrls: ['./bitcoinCard.component.css']
})

export class BitcoinCardComponent implements OnInit{
  BTCdata;
  BTCdataHistoric;
  BTCInUSD: number;
  OneUSDInBTC: number;
  USD: number;
  //for buy/sell inputs
  USD1: number;;
  BTC1: number;;
  USD2: number;;
  BTC2: number;;

  constructor(private http:HttpClient){
  }

  ngOnInit(){

    //get BTC current price data
    this.http.get('https://api.opennode.co/v1/rates/')
    .subscribe((raw)=>{
      //console.log(raw);
      this.BTCdata = raw;
      this.BTCInUSD = this.BTCdata.data.BTCUSD.USD;
      this.OneUSDInBTC = this.BTCdata.data.BTCUSD.BTC;
    });

    //get BTC historical data
    async function getData(){
      let xs = [];
      let ys = [];

      const response = await fetch('https://api.coindesk.com/v1/bpi/historical/close.json');
      const data = await response.json();
      xs = Object.keys(data.bpi);
      ys = Object.keys(data.bpi).map(key => data.bpi[key]);
      return {xs, ys};
    }

    async function chartIt(){
      const data = await getData();
      const chart = new Chart("myChart", {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
            labels: data.xs,
            datasets: [{
                borderColor: 'rgb(255, 174, 53)',
                data: data.ys
            }]
        },

        // Configuration options go here
        options: {
          legend: {
            display: false
        },
          scales: {
              yAxes: [{
                  ticks: {
                      // Include a dollar sign in the ticks
                      callback: function(value, index, values) {
                          return '$' + value;
                      }
                  }
              }]
          }
        }
      });
    }

    chartIt();
  }


  get result1BTC(){
    return Number(this.USD1*this.OneUSDInBTC).toFixed(8);
    //check if funds are insufficient or amount exceeds limit(spending too much). Check NDAX
  }
  get result1USD(){
    return Number(this.BTC1*this.BTCInUSD).toFixed(2);
  }
  get result2BTC(){
    return Number(this.USD2*this.OneUSDInBTC).toFixed(8);
  }
  get result2USD(){
    return Number(this.BTC2*this.BTCInUSD).toFixed(2);
  }

}
