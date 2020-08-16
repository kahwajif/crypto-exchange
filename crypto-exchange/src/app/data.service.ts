import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  result:any;
  APIKEY = '621def888ea82cbdd98c3ba9f10fbd487e222c0663c524f468b1c3495192cb89';
  constructor(private _http: HttpClient) {

  }
  //price of ETH and BTC in USD
  getPricesInUSD(){
    return this._http.get('https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH&tsyms=USD&api_key=' + this.APIKEY)
    .pipe(map(result => this.result = result));
  }
  //price of USD in ETH and BTC
  getPriceInCrypto(){
    return this._http.get('https://min-api.cryptocompare.com/data/price?fsym=USD&tsyms=BTC,ETH')
    .pipe(map(result => this.result = result));
  }

}
