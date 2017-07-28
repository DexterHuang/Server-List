import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Tag } from '../../Model/Tag';
@Component({
  selector: 'app-edit-tags',
  templateUrl: './edit-tags.component.html',
  styleUrls: ['./edit-tags.component.css']
})
export class EditTagsComponent implements OnInit {
  tags: Tag[];
  currentTagName: string;

  constructor() { }

  ngOnInit() {
    firebase.database().ref('tags').on('value', e => {
      this.tags = [];
      if (e.exists()) {
        Object.keys(e.val()).forEach(key => {
          const name = e.val()[key];
          const tag: Tag = new Tag();
          tag.key = key;
          tag.name = name;
          this.tags.push(tag);
        })
      }

    })
  }
  onSaveTag() {
    if (this.currentTagName !== '') {
      firebase.database().ref('tags').push(this.currentTagName).then(a => {
        this.currentTagName = '';
      })
    }
  }
  onClickTag(tag: Tag) {
    firebase.database().ref('tags/' + tag.key).remove();
  }
}
