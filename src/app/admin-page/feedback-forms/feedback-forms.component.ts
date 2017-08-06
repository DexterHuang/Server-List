import { CustomMdDialogComponent } from './../../custom-md-dialog/custom-md-dialog.component';
import { MdDialog } from '@angular/material';
import { Feedback } from './../../Model/Feedback';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-feedback-forms',
  templateUrl: './feedback-forms.component.html',
  styleUrls: ['./feedback-forms.component.css']
})
export class FeedbackFormsComponent implements OnInit {
  feedbacks: Feedback[]
  constructor(private dialog: MdDialog) { }

  ngOnInit() {
    firebase.database().ref('feedbacks').on('value', d => {
      if (d.exists()) {
        this.feedbacks = [];
        const o = d.val();
        Object.keys(o).forEach(key => {
          const f = new Feedback();
          Object.assign(f, o[key]);
          this.feedbacks.push(f);
        })
      }
    })
  }
  onClick(f: Feedback) {
    const dialog = this.dialog.open(CustomMdDialogComponent).componentInstance
    if (f.email) {
      dialog.title = f.title + ' from ' + f.email;
    } else {
      dialog.title = f.title
    }
    dialog.message = f.body;
  }
}
