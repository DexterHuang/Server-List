import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  @Input() server: Server = undefined;
  command: string
  constructor(private route: ActivatedRoute, private router: Router) { }

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
    if (this.server && User.getCurrentUser()) {
      if (User.getCurrentUser().uid === this.server.ownerUid) {
        return true;
      }
    }
    return false;
  }
}
