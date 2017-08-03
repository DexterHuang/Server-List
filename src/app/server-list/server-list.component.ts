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
  @Input() servers: Server[];

  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
}
