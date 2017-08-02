import { GameVersion } from './../../Model/GameVersion';
import { Tag } from './../../Model/Tag';
import { ServerComponent } from './../../server/server.component';
import { element } from 'protractor';
import { MathHelper } from './../../Ultility/MathHelper';
import { InterfaceButton } from './../../Model/InterfaceButton';
import { CustomMdDialogComponent } from './../../custom-md-dialog/custom-md-dialog.component';
import { User } from './../../Model/User';
import { Server } from './../../Model/Server';
import { Component, OnInit, Input, Output } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'

import { MdSnackBar, MdDialog } from '@angular/material';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { FileDropModule, UploadEvent, UploadFile } from 'ngx-file-drop/lib/ngx-drop';

@Component({
  selector: 'app-server-editor',
  templateUrl: './server-editor.component.html',
  styleUrls: ['./server-editor.component.css']
})
export class ServerEditorComponent implements OnInit {
  @Input() inputServer: Server;
  @Input() isNew = false;
  server: Server;
  formGroup: FormGroup;
  onlineMode = true;
  imageFile: UploadFile;
  imageBytes: File;
  description: string;
  selectableTags: Tag[];
  gameVersions: GameVersion[];
  constructor(private fb: FormBuilder, public snackBar: MdSnackBar,
    private router: Router, private dialog: MdDialog) {
    this.formGroup = this.fb.group({
      serverName: ['', Validators.compose([Validators.minLength(2), Validators.maxLength(20)])],
      serverIP: ['', Validators.required],
      description: ['', Validators.maxLength(3000)],
      onlineMode: [false],
      title: ['', Validators.maxLength(50)],
      logoURL: ['', Validators.required],
      RC: ['']
    })
    firebase.database().ref('tags/').once('value', e => {
      if (e.exists()) {
        this.selectableTags = [];
        const o = e.val();
        Object.keys(o).forEach(key => {
          const name = o[key];
          this.selectableTags.push(new Tag(key, name));
        })
      }
    });
    firebase.database().ref('gameVersions/').once('value', e => {
      if (e.exists()) {
        this.gameVersions = [];
        const o = e.val();
        Object.keys(o).forEach(key => {
          const name = o[key].versionName;
          this.gameVersions.push(new GameVersion(name, key))
        })
      }
    })
  }
  ngOnInit() {
    this.server = this.inputServer;
  }
  onSubmit(form) {
    const sendMessage = (msg) => {
      this.snackBar.open(msg, undefined, {
        duration: 2000,
      });
    }
    if (User.getCurrentUser()) {
      let ref;
      if (this.isNew) {
        ref = firebase.database().ref('servers/').push();
        this.server.uid = ref.key;
        this.server.token = MathHelper.getRandomUUID();
      } else {
        ref = firebase.database().ref('servers/' + this.server.uid);
      }
      this.server.ownerUid = User.getCurrentUser().uid;
      const upload = () => {
        ref.set(this.server).then(e => {
          sendMessage('伺服器新增成功!');
          this.router.navigate(['./myServers']);
        }).catch(e => {
          sendMessage('伺服器新增失敗! ' + e.message);
        })
      }
      if (this.imageBytes) {
        const path = 'users/' + User.getCurrentUser().uid + '/servers/' + this.server.uid + '/images';
        firebase.storage().ref(path).child(MathHelper.getRandomUUID()).put(this.imageBytes).then(e => {
          this.server.logoURL = e.downloadURL;
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
  onClickPreview() {
    const dialog = this.dialog.open(ServerComponent).componentInstance;
    const tempServer = new Server();
    Object.assign(tempServer, this.server);
    dialog.server = tempServer;
    dialog.forceNoEdit = true;
  }

  onSelect(tag: Tag) {
    const index = this.server.tags.indexOf(tag.name);
    if (index < 0) {
      this.server.tags.push(tag.name);
    } else {
      this.server.tags.splice(index, 1);
    }
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
  onSelectGameVersion(e) {
    this.server.gameVersion = e.value
  }
}
