import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-online-mode-display',
  templateUrl: './online-mode-display.component.html',
  styleUrls: ['./online-mode-display.component.css']
})
export class OnlineModeDisplayComponent implements OnInit {
  @Input() onlineMode;
  constructor() { }

  ngOnInit() {
  }

}
