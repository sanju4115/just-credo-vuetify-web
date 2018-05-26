import firebase from 'firebase';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();

const FIREBASE_AUTH = firebase.auth();
const FIREBASE_MESSAGING = firebase.messaging();
const db = firebaseApp.firestore();

// FIREBASE_AUTH.onAuthStateChanged(handleAuthStateChanged);
// FIREBASE_MESSAGING.onTokenRefresh(handleTokenRefresh);

// function handleAuthStateChanged(user) {
//   if (user) { // User is signed in
//     //checkSubscription();
//     handleTokenRefresh();
//   } else { // User is not signed in
//     console.log("user is not signed in");
//   }
// }
//
//
// function handleTokenRefresh() {
//   console.log("Handle token refresh.")
//
//   db.collection("notification_tokens").doc(FIREBASE_AUTH.currentUser.uid).set({
//     token: this.$store.getters.notificationToken.token,
//     uid: FIREBASE_AUTH.currentUser.uid
//   }).then(value => {
//     console.log(value);
//   });
// }
//
// navigator.serviceWorker.register('./static/js/firebase-messaging-sw.js')
//   .then((registration) => {
//     FIREBASE_MESSAGING.useServiceWorker(registration);
//     FIREBASE_MESSAGING.requestPermission()
//       .then(() => {
//         FIREBASE_MESSAGING.getToken().then(token => {
//           this.$store.dispatch("setNotificationToken", {token:token});
//           console.log(`The token is ${token}`)
//         })
//       })
//   })
//   .catch(err => {
//     console.log(err)
//   });

/*
function checkSubscription() {
  FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value').then((snapshot) => {
    if ( snapshot.val() ) {

    } else {

    }
  });
}

function subscribeToNotifications() {
  FIREBASE_MESSAGING.requestPermission()
    .then(() => handleTokenRefresh())
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error getting permission :(");
    });
}

function unsubscribeFromNotifications() {
  FIREBASE_MESSAGING.getToken()
    .then((token) => FIREBASE_MESSAGING.deleteToken(token))
    .then(() => FIREBASE_DATABASE.ref('/tokens').orderByChild("uid").equalTo(FIREBASE_AUTH.currentUser.uid).once('value'))
    .then((snapshot) => {
      const key = Object.keys(snapshot.val())[0];
      return FIREBASE_DATABASE.ref('/tokens').child(key).remove();
    })
    .then(() => checkSubscription())
    .catch((err) => {
      console.log("error deleting token :(");
    });
}

function sendNotification(e) {
  e.preventDefault();

  const notificationMessage = document.getElementById('notification-message').value;
  if ( !notificationMessage ) return;

  FIREBASE_DATABASE.ref('/notifications')
    .push({
      user: FIREBASE_AUTH.currentUser.displayName,
      message: notificationMessage,
      userProfileImg: FIREBASE_AUTH.currentUser.photoURL
    })
    .then(() => {
      document.getElementById('notification-message').value = "";
    })
    .catch(() => {
      console.log("error sending notification :(")
    });
}

FIREBASE_MESSAGING.onMessage(payload => {
  console.log(payload);
});
*/
