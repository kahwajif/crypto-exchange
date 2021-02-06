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

    //get BTC current price data
    this._data.getPricesInUSD()
      .subscribe(res=>{
        this.crypto = res['BTC'].USD;
    });
    // get USD in BTC
    this._data.getPriceInCrypto()
      .subscribe(res=>{
        this.USD = res['BTC'];
    });

    //get BTC historical data
    this._data.bitcoinChart(1);
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

  changeData(x){
    
    this._data.bitcoinChart(x);
  }
}
