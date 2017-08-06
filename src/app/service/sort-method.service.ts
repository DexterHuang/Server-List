import { SortMethod } from './../Model/SortMethod';
import { Server } from './../Model/Server';
import { Injectable } from '@angular/core';

@Injectable()
export class SortMethodService {

  sortMethods: SortMethod[] = [];
  defaultMethod: SortMethod;
  constructor() {
    const compareByLastLikeDate = (a: Server, b: Server) => {
      if (a.getLastLikeDate() < b.getLastLikeDate()) {
        return 1;
      }
      return -1;
    }
    this.sortMethods.push(new SortMethod('最受喜愛', (a: Server, b: Server) => {
      if (Math.abs(a.likes - b.likes) < 10) {
        return compareByLastLikeDate(a, b);
      }
      if (a.likes < b.likes) {
        return 1;
      }

      return -1;
    }))
    this.sortMethods.push(new SortMethod('最新伺服', (a: Server, b: Server) => {
      console.log('potao')
      if (a.getCreatedDate() < b.getCreatedDate()) {
        return 1;
      }
      if (a.getCreatedDate() === b.getCreatedDate()) {
        return compareByLastLikeDate(a, b);
      }
      return -1;
    }))
    this.defaultMethod = this.sortMethods[0];
  }

}
