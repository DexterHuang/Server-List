import { User } from './Model/User';
import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
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
  }
}

