import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-my-servers',
  templateUrl: './my-servers.component.html',
  styleUrls: ['./my-servers.component.css']
})
export class MyServersComponent implements OnInit {

  ngOnInit() {
  }
  getCurrentUser() {
    return User.getCurrentUser();
  }
}
