import { Server } from './../../Model/Server';
import { SortMethod } from './../../Model/SortMethod';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sort-method-selector',
  templateUrl: './sort-method-selector.component.html',
  styleUrls: ['./sort-method-selector.component.css']
})
export class SortMethodSelectorComponent implements OnInit {
  sortMethods: SortMethod[] = [];
  defaultMethod: SortMethod;
  @Output() onMethodChange = new EventEmitter<SortMethod>();
  constructor() {
    const compareByLastLikeDate = (a: Server, b: Server) => {
      if (a.lastLikeDate < b.lastLikeDate) {
        return 1;
      }
      return -1;
    }
    this.sortMethods.push(new SortMethod('最受喜愛', (a: Server, b: Server) => {
      if (a.likes < b.likes) {
        return 1;
      }
      if (a.likes === b.likes) {
        return compareByLastLikeDate(a, b);
      }
      return -1;
    }))
    this.sortMethods.push(new SortMethod('創造時間', (a: Server, b: Server) => {
      if (a.createdDate > b.createdDate) {
        return 1;
      }
      if (a.createdDate === b.createdDate) {
        return compareByLastLikeDate(a, b);
      }
      return -1;
    }))

    this.defaultMethod = this.sortMethods[0];


  }

  ngOnInit() {
  }

}
