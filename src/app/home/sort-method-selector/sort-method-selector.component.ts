import { SortMethodService } from './../../service/sort-method.service';
import { Server } from './../../Model/Server';
import { SortMethod } from './../../Model/SortMethod';
import { Component, OnInit, EventEmitter, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sort-method-selector',
  templateUrl: './sort-method-selector.component.html',
  styleUrls: ['./sort-method-selector.component.css']
})
export class SortMethodSelectorComponent implements OnInit {

  @Output() onMethodChange = new EventEmitter<SortMethod>();
  constructor(public sortMethodService: SortMethodService) {

  }

  ngOnInit() {
  }
  onChange(e) {
    this.onMethodChange.emit(e.value);
  }
}
