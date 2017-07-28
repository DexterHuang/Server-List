import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit, OnChanges {
  allServers: Server[] = []
  normalServers: Server[] = [];
  pingServers: Server[] = [];
  @Input() onlyShowMyServer: boolean;
  @Input() pageNumber: number;

  serverPerPage = 10;
  refreshPageNumber() {
    this.allServers = [];
    this.allServers = this.allServers.concat(this.normalServers, this.pingServers);
    if (!this.onlyShowMyServer) {
      const startIndex = (this.pageNumber - 1) * this.serverPerPage;
      const endIndex = startIndex + 10;
      this.allServers = this.allServers.slice(startIndex, endIndex);
    }
  }
  ngOnInit() {
    const addValueToServerList = (e, list: Server[]) => {
      const o = e.val();
      if (o) {
        Object.keys(o).forEach(key => {
          const s = o[key];
          const server: Server = new Server();
          Object.assign(server, s);
          list.push(server);
        })
      }
      this.refreshPageNumber();
    }
    if (this.getCurrentUser() && this.onlyShowMyServer) {
      firebase.database().ref('servers').orderByChild('ownerUid').equalTo(this.getCurrentUser().uid).limitToFirst(100).on('value', e => {
        this.normalServers = []
        addValueToServerList(e, this.normalServers);
      });
    } else {
      firebase.database().ref('servers').on('value', e => {
        this.normalServers = []
        addValueToServerList(e, this.normalServers);
      })
      const limit = 11 * 60 * 1000
      console.log(new Date().getTime() - limit, 1500293853384)
      console.log(new Date().getTime() - limit < 1500293853384)
      firebase.database().ref('pingServers').orderByChild('lastPingTime').
        startAt(new Date().getTime() - limit).on('value', e => {
          this.pingServers = []
          addValueToServerList(e, this.pingServers);
        })
    }

  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
  ngOnChanges(changes: SimpleChanges): void {

    this.refreshPageNumber();
  }
}
