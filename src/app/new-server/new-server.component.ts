import { element } from 'protractor';
import { MathHelper } from './../Ultility/MathHelper';
import { InterfaceButton } from './../Model/InterfaceButton';
import { CustomMdDialogComponent } from './../custom-md-dialog/custom-md-dialog.component';
import { User } from './../Model/User';
import { Server } from './../Model/Server';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'

import { MdSnackBar, MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FileDropModule, UploadEvent, UploadFile } from 'ngx-file-drop/lib/ngx-drop';
@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.css']
})
export class NewServerComponent implements OnInit {
  formGroup: FormGroup;
  onlineMode = true;
  imageFile: UploadFile;
  imageBytes: File;
  description: string;
  selectableTags: string[];
  constructor(private fb: FormBuilder, public snackBar: MdSnackBar,
    private router: Router, private dialog: MdDialog) {
    this.formGroup = this.fb.group({
      serverName: ['', Validators.required],
      serverIP: ['', Validators.required],
      description: ['', Validators.maxLength(3000)],
      onlineMode: [false],
      tags: [[], Validators.required]
    })
    firebase.database().ref('tags/').once('value', e => {
      console.log(e.numChildren())
    });
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
      server.token = MathHelper.getRandomUUID();
      server.ownerUid = User.getCurrentUser().uid;
      const upload = () => {
        ref.set(server).then(e => {
          sendMessage('伺服器新增成功!');
          this.router.navigate(['./myServers']);
        }).catch(e => {
          sendMessage('伺服器新增失敗! ' + e.message);
        })
      }
      if (this.imageBytes) {
        const path = 'users/' + User.getCurrentUser().uid + '/servers/' + server.uid + '/images';
        firebase.storage().ref(path).child(MathHelper.getRandomUUID()).put(this.imageBytes).then(e => {
          server.logoURL = e.downloadURL;
          upload();
        })
      } else {
        upload();
      }

    } else {
      sendMessage('請先登入');
      this.router.navigate(['./login']);
    }
  }
  public dropped(event: UploadEvent) {
    const dialog = this.dialog.open(CustomMdDialogComponent);
    dialog.componentInstance.title = '讀取圖片中..'
    dialog.componentInstance.message = '請稍等';
    for (const file of event.files) {
      file.fileEntry.file(info => {
        if (info.size < 400000) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(info)
          fileReader.onload = () => {

            const img = new Image();
            img.onload = () => {
              if (img.height === 100) {
                this.imageFile = fileReader.result;
                this.imageBytes = info;
                this.dialog.closeAll();
              } else {
                dialog.componentInstance.title = '圖片尺寸不正確!';
                dialog.componentInstance.message = 'Logo圖片高/長度必須是100';
                dialog.componentInstance.buttons.push(new InterfaceButton('照樣使用', () => {
                  this.imageFile = fileReader.result;
                  this.imageBytes = info;
                  this.dialog.closeAll();
                }));
                dialog.componentInstance.buttons.push(new InterfaceButton('取消'));
              }
            }
            img.src = fileReader.result + '';
          }
        } else {
          dialog.componentInstance.title = '圖片太大!';
          dialog.componentInstance.message = 'Logo檔案大小必須小於400kb';
          dialog.componentInstance.buttons.push(new InterfaceButton('Ok'));
        }
      });
    }
  }

  public fileOver(event) {
  }

  public fileLeave(event) {
  }
  ngOnInit() {
  }
}
