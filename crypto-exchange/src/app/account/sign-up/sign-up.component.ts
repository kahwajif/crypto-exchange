import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  constructor( public nav: NavbarService ) { }

  ngOnInit(): void {
    this.nav.hide();
  }

}
