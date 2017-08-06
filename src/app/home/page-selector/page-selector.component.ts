import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-selector',
  templateUrl: './page-selector.component.html',
  styleUrls: ['./page-selector.component.css']
})
export class PageSelectorComponent implements OnInit {

  @Input() selectedPage: number;
  @Output() pageChanged = new EventEmitter<number>();
  showingNumbers = []
  constructor() { }

  ngOnInit() {
    this.init();
  }
  init() {
    this.showingNumbers = [];
    for (let i = -3; i < 3; i++) {
      const p: number = this.selectedPage + i;
      if (p > 0) {
        this.showingNumbers.push(p);
      }
    }
  }
  onClick(page: number) {
    this.selectedPage = page;
    this.init();
    this.pageChanged.emit(this.selectedPage);
  }
}
