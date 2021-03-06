import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-doge-card',
  templateUrl: './doge-card.component.html',
  styleUrls: ['./doge-card.component.css']
})
export class DogeCardComponent implements OnInit {

  crypto: any;
  USD: any;

 
  //for buy/sell inputs
  USD1: number;;
  DOGE1: number;;
  USD2: number;;
  DOGE2: number;;

  constructor(private _data: DataService){
  }

  ngOnInit(){
    //get DOGE current price data
    this._data.getPricesInUSD()
      .subscribe(res=>{
        this.crypto = res['DOGE'].USD;
    });
    // get USD in DOGE
    this._data.getPriceInCrypto()
      .subscribe(res=>{
        this.USD = res['DOGE'];
    });
    this._data.dogeChart(1);
  }

//converts USD to ETH and vice versa
  get result1DOGE(){
    return Number(this.USD1*this.USD);
  }
  get result1USD(){
    return Number(this.DOGE1*this.crypto);
  }
  get result2DOGE(){
    return Number(this.USD2*this.crypto);
  }
  get result2USD(){
    return Number(this.DOGE2*this.USD);
  }

  check1: boolean;
  check2: boolean;
  checkAmount1(){
    this.checkNegative();
    if(this.USD1 < 0 || this.DOGE1 < 0){
      this.USD1 = 0;
      this.DOGE1 = 0
    }
    else if(this.USD1 > 100000 || this.DOGE1 > 99){
      this.check2 = true;
      this.check1 = false;
    }
    else if(this.USD1 || this.DOGE1){
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
    if(this.USD2 > 100000 || this.DOGE2 > 99){
      this.check4 = true;
      this.check3 = false;
    }
    else if(this.USD2 || this.DOGE2){
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
    
    this._data.dogeChart(x);
  }

}
