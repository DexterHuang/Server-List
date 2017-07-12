import { Server } from './../Model/Server';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-server-list-item',
  templateUrl: './server-list-item.component.html',
  styleUrls: ['./server-list-item.component.css']
})
export class ServerListItemComponent implements OnInit {
  @Input() server: Server;
  @Input() canEdit = false;
  ping = 9999;
  ngOnInit() {

    this.pinger_ping(this.server.IP)
  }
  pinger_ping(ip) {
    try {
      const img = new Image();
      const startTime = new Date().getTime();
      img.onload = function () {
        const dis = ServerListItemComponent.bind(this);
        dis.ping = new Date().getTime() - startTime;
      };
      img.onerror = (e) => {
        this.ping = new Date().getTime() - startTime;
      };
      img.src = 'http://' + ip;
    } catch (e) {

    }

  }
}
