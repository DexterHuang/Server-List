import { Server } from './../../Model/Server';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {
  @Input() server: Server;
  constructor() { }

  ngOnInit() {
  }

}
