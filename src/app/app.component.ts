import { Component, OnInit } from '@angular/core';
import {Router, NavigationStart} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  hideBackLink = false;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (event.url === '/home' || event.url === '/' ) {
          this.hideBackLink = true;
        } else {
          this.hideBackLink = false;
        }
      }
    });
  }
}
