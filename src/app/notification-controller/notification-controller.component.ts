import { User } from './../Model/User';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
@Component({
  selector: 'app-notification-controller',
  templateUrl: './notification-controller.component.html',
  styleUrls: ['./notification-controller.component.css']
})
export class NotificationControllerComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const messaging = firebase.messaging();

    messaging.requestPermission()
      .then(function () {
        console.log('Notification permission granted.');
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
      })
      .catch(function (err) {
        console.log('Unable to get permission to notify.', err);
      });
    const sendTokenToServer = (token) => {
      if (User.getCurrentUser()) {
        console.log('update user token')
        const u = User.getCurrentUser();
        firebase.database().ref('users/' + u.uid + '/FCMToken').set(token);
      } else {
        console.log('update non-user token', token)
      }
    }
    messaging.onTokenRefresh(function () {
      messaging.getToken()
        .then(function (refreshedToken) {
          console.log('Token refreshed.');
          // Indicate that the new Instance ID token has not yet been sent to the
          // app server.
          // Send Instance ID token to app server.
          sendTokenToServer(refreshedToken);
          // ...
        })
        .catch(function (err) {
          console.log('Unable to retrieve refreshed token ', err);
        });
    });

    messaging.onMessage(function (payload) {
      console.log('Message received. ', payload);
      // ...
    });
    const onUserChange = () => {
      messaging.getToken()
        .then(function (currentToken) {
          if (currentToken) {
            sendTokenToServer(currentToken);
          } else {
            // Show permission request.
            console.log('No Instance ID token available. Request permission to generate one.');
            // Show permission UI.
          }
        })
        .catch(function (err) {
          console.log('An error occurred while retrieving token. ', err);
        });
    }
    User.addOnStateChanges(onUserChange);
    setTimeout(() => {
      if (!User.getCurrentUser()) {
        onUserChange();
      }
    }, 10000)
  }
}
