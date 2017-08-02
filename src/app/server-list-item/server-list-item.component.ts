import { HttpClient } from '@angular/common/http';
import { Server } from './../Model/Server';
import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-server-list-item',
  templateUrl: './server-list-item.component.html',
  styleUrls: ['./server-list-item.component.css']
})
export class ServerListItemComponent implements OnInit {
  @Input() server: Server;
  constructor(private http: HttpClient) { }
  ngOnInit() {
  }
}
