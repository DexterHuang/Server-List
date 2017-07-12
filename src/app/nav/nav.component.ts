import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  isLogin() {
    return firebase.auth().currentUser;
  }
  logOut() {
    firebase.auth().signOut();
  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
}
