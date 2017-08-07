import { Router, NavigationEnd } from '@angular/router';
import { GoogleAnalyticEventsService } from './service/google-analytic-events.service';
import { User } from './Model/User';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

declare let ga: Function;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  text = 'texthere';
  constructor(public router: Router, private gas: GoogleAnalyticEventsService) {
    const config = {
      apiKey: 'AIzaSyCo3B6hvOwlVqpFZ3DqUA4-RSmP1D3-3wg',
      authDomain: 'serverlist-362d5.firebaseapp.com',
      databaseURL: 'https://serverlist-362d5.firebaseio.com',
      projectId: 'serverlist-362d5',
      storageBucket: 'serverlist-362d5.appspot.com',
      messagingSenderId: '576678373258'
    };
    firebase.initializeApp(config);
    User.init();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }
}

