import { Tag } from './../../Model/Tag';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.css']
})
export class TagFilterComponent implements OnInit {
  @Output() onTagChange = new EventEmitter();
  tags: Tag[] = [];
  selectedTags: Tag[] = [];
  constructor() { }

  ngOnInit() {
    firebase.database().ref('tags').once('value', e => {
      const o = e.val();
      this.tags = [];
      Object.keys(o).forEach(key => {
        const t = new Tag(key, o[key]);
        this.tags.push(t);
      })
    })
  }
  isTagSelected(tag: Tag) {
    return this.selectedTags.indexOf(tag) >= 0;
  }
  onSelect(tag: Tag) {
    if (this.isTagSelected(tag)) {
      this.selectedTags.splice(this.selectedTags.indexOf(tag), 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.onTagChange.emit(this.selectedTags);
  }
}
