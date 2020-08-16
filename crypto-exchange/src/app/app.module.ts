import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { DataService } from './data.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NavComponent} from './Nav/nav.component'
import {BitcoinCardComponent} from './crypto-cards/Bitcoin/bitcoinCard.component';
import { EthereumCardComponent } from './crypto-cards/Ethereum/ethereum-card/ethereum-card.component'


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BitcoinCardComponent,
    EthereumCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
