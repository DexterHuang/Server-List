import { GoogleAnalyticEventsService } from './../service/google-analytic-events.service';
import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-my-servers',
  templateUrl: './my-servers.component.html',
  styleUrls: ['./my-servers.component.css']
})
export class MyServersComponent implements OnInit {
  servers: Server[] = [];
  constructor(private gas: GoogleAnalyticEventsService) { }
  ngOnInit() {
    const triedTimes = 0;
    let success = false;
    setInterval(() => {
      if (this.getCurrentUser() && triedTimes < 10 && !success) {
        firebase.database().ref('servers').orderByChild('ownerUid').equalTo(this.getCurrentUser().uid)
          .limitToFirst(100).once('value', e => {
            this.servers = [];
            Object.keys(e.val()).forEach(key => {
              const s = new Server();
              Object.assign(s, e.val()[key]);
              this.servers.push(s);
            })
          });
        success = true;
      }
    }, 1000);
  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
}
