import { SortMethodService } from './../service/sort-method.service';
import { SortMethod } from './../Model/SortMethod';
import { Tag } from './../Model/Tag';
import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {

  currentPage = 1;
  allServers: Server[] = []
  normalServers: Server[] = [];
  pingServers: Server[] = [];
  serverPerPage = 10;
  filterTags: Tag[] = [];
  filterOnlineModeEnabled = false;
  filterOnlineModeDisable = false;
  sortMethod: SortMethod;
  constructor(private sortMethodService: SortMethodService) {
    this.sortMethod = this.sortMethodService.defaultMethod;
  }
  refreshPageNumber() {
    this.allServers = [];
    this.allServers = this.allServers.concat(this.normalServers, this.pingServers);
    const startIndex = (this.currentPage - 1) * this.serverPerPage;
    const endIndex = startIndex + this.serverPerPage;

    this.allServers = this.allServers.filter(server => {
      let filter = true;
      this.filterTags.forEach(tag => {
        if (server.tags.indexOf(tag.name) < 0) {
          filter = false;
        }
      })
      return filter;
    })
    this.allServers = this.allServers.filter(server => {
      if (this.filterOnlineModeDisable) {
        return !server.onlineModeEnabled;
      }
      if (this.filterOnlineModeEnabled) {
        return server.onlineModeEnabled;
      }
      return true;
    }
    );
    this.allServers.sort((a, b) => {
      return this.sortMethod.method(a, b);
    });
    this.allServers = this.allServers.slice(startIndex, endIndex);
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

    firebase.database().ref('servers').once('value', e => {
      this.normalServers = []
      addValueToServerList(e, this.normalServers);
    })
    const limit = 11 * 60 * 1000
    firebase.database().ref('pingServers').orderByChild('lastPingTime').
      startAt(new Date().getTime() - limit).once('value', e => {
        this.pingServers = []
        addValueToServerList(e, this.pingServers);
      })
  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
  onPageChange(e: number) {
    this.currentPage = e;
    this.refreshPageNumber();
  }
  onTagChange(tags: Tag[]) {
    this.filterTags = tags;
    this.refreshPageNumber();
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log('change')
    this.refreshPageNumber();
  }
  filterOnlineModeEnabledChange(e) {
    this.filterOnlineModeEnabled = e.checked;
    this.refreshPageNumber();
  }
  filterOnlineModeDisabledCahneg(e) {
    this.filterOnlineModeDisable = e.checked;
    this.refreshPageNumber();
  }
  onSortMethodChange(method: SortMethod) {
    this.sortMethod = method;
    this.refreshPageNumber();
  }
}
