import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor( public nav: NavbarService ) { }

  ngOnInit(): void {
    this.nav.hide();
  }

}
