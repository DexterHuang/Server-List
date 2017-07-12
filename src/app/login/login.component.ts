import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms'
import * as firebase from 'firebase';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup;
  constructor(private fb: FormBuilder, public snackBar: MdSnackBar,
    private router: Router) {
    this.formGroup = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }
  onSubmit(form) {
    console.log(form)

  }
  ngOnInit() {
  }
  siginWithGoogle() {
    const loginFailedMessage = (msg) => {
      this.snackBar.open(msg, undefined, {
        duration: 2000,
      });
    }
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      const token = result.credential.accessToken;
      const u = result.user;
      const user = new User();
      user.displayName = u.displayName;
      user.email = u.email;
      user.emailVerified = u.emailVerified;
      user.photoURL = u.photoURL;
      user.providerId = u.providerId;
      user.uid = u.uid;
      firebase.database().ref('users/' + user.uid).set(user).then(e => {
        User.setCurrentUserUid(user.uid);
        this.router.navigate(['./home']);
        this.snackBar.open('成功登入', undefined, {
          duration: 3000,
        });
      }).catch(e => {
        loginFailedMessage(e.message);
      });
    }).catch(function (error) {
      loginFailedMessage(error.message);
    });
  }

}
