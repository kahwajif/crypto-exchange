import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Chart } from 'chart.js'

const API_KEY = '621def888ea82cbdd98c3ba9f10fbd487e222c0663c524f468b1c3495192cb89'

@Injectable({
  providedIn: 'root'
})
export class DataService {
  result:any;
  constructor(private _http: HttpClient) {

  }
  //price of ETH and BTC in USD
  getPricesInUSD(){
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD&api_key='+API_KEY)
    .pipe(map(result => this.result = result));
  }
  //price of USD in ETH and BTC
  getPriceInCrypto(){
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH&api_key='+ API_KEY)
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

  async getData(){
    let historicData;
      let historicX = [];
      let historicY = [];
      let historicTime = [];
      let historicYears = [];
      let monthHistoricY =[];
      let monthHistoricTime = [];
      let yearHistoricTime = [];
      let yearHistoricY = [];
      const res = await fetch('https://min-api.cryptocompare.com/data/v2/histoday?fsym=BTC&tsym=USD&limit=1825&api_key=621def888ea82cbdd98c3ba9f10fbd487e222c0663c524f468b1c3495192cb89');
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
        historicYears.push(historicTime[i].split(" ").splice(-1));
      }
      //1 year
      for(let i=0;i<365;i++){
        yearHistoricY.push(historicY[1460+i])
        yearHistoricTime.push(historicTime[1460+i]);
      }

      //1 month
      for(let i=0;i<30;i++){
        monthHistoricY.push(historicY[1795+i])
        monthHistoricTime.push(historicTime[1795+i].substring(0, historicTime[1795+i].lastIndexOf(" ")));
      }
      
      return {monthHistoricTime, monthHistoricY, historicTime, historicY, historicYears, yearHistoricTime, yearHistoricY};
  }

  async chartMonth(){
    const data = await this.getData();
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

  async chartFiveYears(){
    const data = await this.getData();
    const chart = new Chart('myChart', {
      type: "line",
      data: {
        labels: data.historicYears,
        datasets: [
          {
            label: "Bitcoin",
            pointRadius: 0,
            pointBorderWidth: 1,
            pointBackgroundColor: "#eea231",
            borderWidth: '1',
            borderColor: "#eea231",
            fontColor: 'white',
            defaultFontSize: 20,
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
  }

  async chartYear(){
    const data = await this.getData();
    const chart = new Chart('myChart', {
      type: "line",
      data: {
        labels: data.yearHistoricTime,
        datasets: [
          {
            label: "Bitcoin",
            pointRadius: 0,
            pointBorderWidth: 1,
            pointBackgroundColor: "#eea231",
            borderWidth: '1',
            borderColor: "#eea231",
            fontColor: 'white',
            defaultFontSize: 20,
            data: data.yearHistoricY
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
  }
}
