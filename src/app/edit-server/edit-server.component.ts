import { ServerComponent } from './../server/server.component';
import { MathHelper } from './../Ultility/MathHelper';
import { InterfaceButton } from './../Model/InterfaceButton';
import { CustomMdDialogComponent } from './../custom-md-dialog/custom-md-dialog.component';
import { MdSnackBar, MdDialog } from '@angular/material';
import { Server } from './../Model/Server';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import * as firebase from 'firebase';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: Server;
  saved = false;
  constructor(private fb: FormBuilder, public snackBar: MdSnackBar,
    private router: Router, private route: ActivatedRoute,
    private dialog: MdDialog) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['uid'] !== undefined) {
        firebase.database().ref('servers/' + params['uid']).once('value', e => {
          if (e.val()) {
            this.server = new Server();
            Object.assign(this.server, e.val());
            if (this.server.token === undefined) {
              this.server.token = MathHelper.getRandomUUID();
            }
          } else {
            this.router.navigate(['home'])
          }
        })
      } else {
        this.router.navigate(['home'])
      }
    })
  }
}
