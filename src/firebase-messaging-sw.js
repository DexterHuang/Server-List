// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.9.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({

    apiKey: 'AIzaSyCo3B6hvOwlVqpFZ3DqUA4-RSmP1D3-3wg',
    authDomain: 'serverlist-362d5.firebaseapp.com',
    databaseURL: 'https://serverlist-362d5.firebaseio.com',
    projectId: 'serverlist-362d5',
    storageBucket: 'serverlist-362d5.appspot.com',
    messagingSenderId: '576678373258'

});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    console.log(payload);
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});
console.log('web worker initialized')
//dFQhNPpVZBs:APA91bGtkutDbujYcCeT9XhK7C4o8wQB_TM6R0Bkuazfiwuut8yPxoPdqOz0ElqBpNbsy4GjSqwwwlZwdG94Irl2_fI_qT3AGQN9g7TKaDOPZsXM1euOdgcC35kNEW1rz70j7o3VjdZ3