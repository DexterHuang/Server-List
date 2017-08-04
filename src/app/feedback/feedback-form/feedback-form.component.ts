import { Feedback } from './../../Model/Feedback';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-feedback-form',
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  formGroup: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: ['', Validators.compose([Validators.minLength(0), Validators.maxLength(20)])],
      title: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(20)])],
      body: ['', Validators.compose([Validators.minLength(3), Validators.maxLength(300)])]
    })
  }
  onSubmit(form) {
    const feedback = new Feedback();
    Object.assign(feedback, form);
    const ref = firebase.database().ref('feedbacks').push()
    feedback.key = ref.key;
    this.submitted = true;
    ref.set(feedback).then(e => {
    });
  }
}
