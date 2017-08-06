import { Server } from './../../Model/Server';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-link-to-server',
  templateUrl: './link-to-server.component.html',
  styleUrls: ['./link-to-server.component.css']
})
export class LinkToServerComponent implements OnInit {
  command: string;
  constructor() { }

  ngOnInit() {
  }

}
