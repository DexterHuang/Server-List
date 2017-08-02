import { Server } from './../../Model/Server';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-detail',
  templateUrl: './server-detail.component.html',
  styleUrls: ['./server-detail.component.css']
})
export class ServerDetailComponent implements OnInit {
  @Input() server: Server;

  ping = 9999;
  constructor() { }

  ngOnInit() {
    this.pinger_ping(this.server.IP)
  }

  pinger_ping(ip) {

    try {
      const img = new Image();

      const startTime = new Date().getTime();
      img.onload = (e) => {
        this.ping = new Date().getTime() - startTime;
      };
      img.onerror = (e) => {
        this.ping = new Date().getTime() - startTime;
        if (this.ping > 1000) {
          this.ping = 9999
        }
      };
      img.src = 'http://' + ip;
    } catch (e) {

    }

  }
}
