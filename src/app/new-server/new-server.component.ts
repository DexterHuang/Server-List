import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'

import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.css']
})
export class NewServerComponent implements OnInit {
  formGroup: FormGroup;
  onlineMode = true;
  constructor(private fb: FormBuilder, public snackBar: MdSnackBar,
    private router: Router) {
    this.formGroup = this.fb.group({
      serverName: ['', Validators.required],
      serverIP: ['', Validators.required],
      description: ['', Validators.maxLength(3000)],
      onlineMode: [false]
    })
  }
  onSubmit(form) {
    const sendMessage = (msg) => {
      this.snackBar.open(msg, undefined, {
        duration: 2000,
      });
    }
    if (User.getCurrentUser()) {
      const server: Server = new Server();
      server.serverName = form.serverName;
      server.IP = form.serverIP;
      server.description = form.description;
      server.onlineModeEnabled = form.onlineMode;
      const ref = firebase.database().ref('servers/').push();
      server.uid = ref.key;
      server.ownerUid = User.getCurrentUser().uid;
      ref.set(server).then(e => {
        sendMessage('伺服器新增成功!');
        this.router.navigate(['./myServers']);
      }).catch(e => {
        sendMessage('伺服器新增失敗! ' + e.message);
      })
    } else {
      sendMessage('請先登入');
      this.router.navigate(['./login']);
    }
  }

  ngOnInit() {
  }
}
