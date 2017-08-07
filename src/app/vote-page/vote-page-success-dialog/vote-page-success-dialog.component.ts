import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-vote-page-success-dialog',
  templateUrl: './vote-page-success-dialog.component.html',
  styleUrls: ['./vote-page-success-dialog.component.css']
})
export class VotePageSuccessDialogComponent implements OnInit {
  @Input() command;
  constructor() { }

  ngOnInit() {
  }

}
