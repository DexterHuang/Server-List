import { LoginComponent } from './../login/login.component';
import { User } from './../Model/User';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { CustomMdDialogComponent } from './../custom-md-dialog/custom-md-dialog.component';
import { MdDialog } from '@angular/material';
import { Server } from './../Model/Server';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.css']
})
export class VotePageComponent implements OnInit {
  server: Server;
  uid: string;
  playerName: string;
  voteResult: string;
  msg: string;
  copyString: string;
  constructor(private http: HttpClient, private route: ActivatedRoute, private dialog: MdDialog) { }
  // server;uid=-KpFSUorX7N0DKUp7B8A;playerName=thunderbuddyted
  ngOnInit() {
    this.route.params.subscribe(params => {
      const uid = params['uid'];
      this.playerName = params['playerName'];
      if (uid !== undefined && this.playerName !== undefined) {
        firebase.database().ref('servers/' + uid).once('value', e => {
          if (e.exists()) {
            this.server = new Server();
            Object.assign(this.server, e.val())
          } else {
            const d = this.dialog.open(CustomMdDialogComponent);
            d.componentInstance.title = 'T ^ T';
            d.componentInstance.message = '好像這個伺服器不存在呢..';
          }
        })
      } else {
        setTimeout(() => {
          const d = this.dialog.open(CustomMdDialogComponent);
          d.componentInstance.title = '??@@';
          d.componentInstance.message = '這個網址不是正確的';
        }, 1);
      }
    })
    setInterval(e => {
      if (User.getCurrentUser()) {
        this.copyString = '/iVoted ' + User.getCurrentUser().uid;
      }
    }, 200);
  }
  onClickLikeButton() {
    if (User.getCurrentUser()) {
      const url = 'https://us-central1-serverlist-362d5.cloudfunctions.net/vote';
      const local = 'http://localhost:5002/serverlist-362d5/us-central1/vote';
      this.voteResult = 'waiting';
      this.http.post(url, {
        playerName: this.playerName,
        serverUid: this.server.uid,
        userId: User.getCurrentUser().uid
      }).subscribe(e => {
        console.log(e);
        if (e['status'] === 'good') {
          this.voteResult = 'voted'
        } else {
          this.voteResult = 'bad';
          this.msg = e['message'];
        }
      })
    } else {
      this.dialog.open(LoginComponent)
    }

  }
}
