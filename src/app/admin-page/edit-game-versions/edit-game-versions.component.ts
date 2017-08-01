import { GameVersion } from './../../Model/GameVersion';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-edit-game-versions',
  templateUrl: './edit-game-versions.component.html',
  styleUrls: ['./edit-game-versions.component.css']
})
export class EditGameVersionsComponent implements OnInit {
  gameVersions: GameVersion[] = []
  currentInput: string;
  constructor() { }

  ngOnInit() {
    firebase.database().ref('gameVersions').on('value', e => {
      if (e.exists()) {
        this.gameVersions = [];
        const o = e.val();
        Object.keys(o).forEach(key => {
          const v: GameVersion = new GameVersion(o[key].versionName, key);
          this.gameVersions.push(v);
        })
      }
    })

  }
  onSave() {
    if (this.currentInput !== '' || this.currentInput !== undefined) {
      const ref = firebase.database().ref('gameVersions').push();
      const v = new GameVersion(this.currentInput, ref.key);
      ref.set(v);
      this.currentInput = '';
    }
  }
  onClick(v: GameVersion) {
    firebase.database().ref('gameVersions/' + v.key).remove();
  }
}
