import { FeedbackFormComponent } from './../feedback-form/feedback-form.component';
import { MdDialog } from '@angular/material';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback-button',
  templateUrl: './feedback-button.component.html',
  styleUrls: ['./feedback-button.component.css']
})
export class FeedbackButtonComponent implements OnInit {

  constructor(private dialog: MdDialog) { }

  ngOnInit() {
  }
  onClick() {
    const dialog = this.dialog.open(FeedbackFormComponent).componentInstance;

  }
}
