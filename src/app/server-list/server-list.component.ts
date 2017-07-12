import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {
  servers: Server[] = []

  ngOnInit() {
    const f = (e) => {
      this.servers = [];
      const o = e.val();
      if (o) {
        Object.keys(o).forEach(key => {
          const s = o[key];
          const server: Server = new Server();
          Object.assign(server, s);
          this.servers.push(server);
        })
      }
    }
    if (!this.getCurrentUser()) {
      firebase.database().ref('servers').on('value', e => {
        f(e);
      })
    } else {
      firebase.database().ref('servers').orderByChild('ownerUid').equalTo(this.getCurrentUser().uid).limitToFirst(100).on('value', e => {
        f(e);
      });
    }
  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
}
