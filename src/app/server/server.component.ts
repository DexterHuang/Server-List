import { LinkToServerComponent } from './link-to-server/link-to-server.component';
import { CustomMdDialogComponent } from './../custom-md-dialog/custom-md-dialog.component';
import { MdDialog } from '@angular/material';
import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  @Input() server: Server = undefined;
  command: string
  forceNoEdit = false;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private dialog: MdDialog) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['uid'];
      firebase.database().ref('servers/' + uid).once('value', (d) => {
        const o = d.val();
        if (o) {
          this.server = new Server();
          Object.assign(this.server, o);
          this.command = '/TWVoteSetting ' + this.server.uid + ' ' + this.server.token;

        }
      })
    });


  }
  canEdit() {
    if (this.forceNoEdit) {
      return false;
    }
    if (this.server && User.getCurrentUser()) {
      if (User.getCurrentUser().uid === this.server.ownerUid ||
        User.getCurrentUser().uid === 'aXmmXWQmvuaLtx3Kd4uMRBtOw1O2') {
        return true;
      }
    }
    return false;
  }
  onClickVote() {
    const dialog = this.dialog.open(CustomMdDialogComponent).componentInstance;
    dialog.title = ':D';
    dialog.message = '要按讚的話必須要登入伺服器然後打/twVote喔!';
  }
  onClickLink() {
    const dialog = this.dialog.open(LinkToServerComponent).componentInstance
    dialog.command = this.command;
  }
}
