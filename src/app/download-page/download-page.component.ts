import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-download-page',
  templateUrl: './download-page.component.html',
  styleUrls: ['./download-page.component.css']
})
export class DownloadPageComponent implements OnInit {
  downloadLink: string;
  constructor() { }

  ngOnInit() {
    firebase.database().ref('pluginDownloadLink').once('value', e => {
      this.downloadLink = e.val()
    })
  }

  isLogin() {
    if (User.getCurrentUser()) {
      return true;
    }
    return false;
  }
  logOut() {

  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
}
