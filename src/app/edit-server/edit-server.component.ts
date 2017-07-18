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
  formGroup: FormGroup;
  onlineMode = true;
  constructor(private fb: FormBuilder, public snackBar: MdSnackBar,
    private router: Router, private route: ActivatedRoute,
    private dialog: MdDialog) {
    this.formGroup = this.fb.group({
      serverName: ['', Validators.required],
      serverIP: ['', Validators.required],
      description: ['', Validators.required],
      onlineMode: [false]
    })
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
            this.formGroup.updateValueAndValidity()
          } else {
            this.router.navigate(['home'])
          }
        })
      } else {
        this.router.navigate(['home'])
      }
    })
  }
  onSubmit(form) {
    firebase.database().ref('servers/' + this.server.uid).set(this.server).then(e => {
      this.snackBar.open('成功儲存!', null, { duration: 3000 });
    })
  }
  onClickDelete() {
    const dialog = this.dialog.open(CustomMdDialogComponent);
    dialog.componentInstance.message = '您確定要刪除此伺服器嗎??'
    dialog.componentInstance.title = 'NANI??!';
    dialog.componentInstance.buttons.push(new InterfaceButton('No! 我按錯了..'));
    dialog.componentInstance.buttons.push(new InterfaceButton('確定', () => {
      firebase.database().ref('servers/' + this.server.uid).remove().then(e => {
        this.snackBar.open('刪除成功', undefined, {
          duration: 3000
        })
        this.router.navigate(['../myServers'])
      })
    }));
  }
  onClickPreview() {
    const dialog = this.dialog.open(ServerComponent).componentInstance;
    dialog.server = this.server;
    dialog.forceNoEdit = true;
  }
}
