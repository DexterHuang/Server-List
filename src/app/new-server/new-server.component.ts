import { Server } from './../Model/Server';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.css']
})
export class NewServerComponent implements OnInit {
  ngOnInit(): void {
  }
  getNewServer(): Server {
    return new Server();
  }
}
