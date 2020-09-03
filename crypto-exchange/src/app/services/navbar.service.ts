import { Injectable } from '@angular/core';

@Injectable()
export class NavbarService {
  visible: boolean;

  constructor() { this.visible = false; }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  toggle() { this.visible = !this.visible; }

  //show/hide mobile nav also??
  doSomethingElseUseful() { }
}
