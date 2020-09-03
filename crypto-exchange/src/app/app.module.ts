import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { DataService } from './services/data.service';
import { AppRoutingModule } from './app-routing.module';
import { NavbarService } from './services/navbar.service';

import { AppComponent } from './app.component';
import {NavComponent} from './Nav/nav.component'
import {BitcoinCardComponent} from './home/crypto-cards/Bitcoin/bitcoinCard.component';
import { EthereumCardComponent } from './home/crypto-cards/Ethereum/ethereum-card/ethereum-card.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { SignUpComponent } from './account/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { SignInComponent } from './account/sign-in/sign-in.component'

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BitcoinCardComponent,
    EthereumCardComponent,
    SideNavComponent,
    SignUpComponent,
    HomeComponent,
    SignInComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [DataService, NavbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
