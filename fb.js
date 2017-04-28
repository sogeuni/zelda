var fbConfig = {
  apiKey: "AIzaSyCIKZLOCf2X25EcdVRbzjHYhuh5W5uNZvA",
  authDomain: "zelda-1492739821588.firebaseapp.com",
  databaseURL: "https://zelda-1492739821588.firebaseio.com",
  projectId: "zelda-1492739821588",
  storageBucket: "zelda-1492739821588.appspot.com",
  messagingSenderId: "142131556390"
};
firebase.initializeApp(fbConfig);

var cb;

function setCallback(callback) {
  cb = callback;
}

firebase.auth().onAuthStateChanged(function(user) {
  if (cb != null) {
    cb(user);
  }
});

function toggleSignIn(successCallback, errorCallback) {
	if (!firebase.auth().currentUser) {
    // console.log("sign in");

		var provider = new firebase.auth.GoogleAuthProvider();
	    //provider.addScope('https://www.googleapis.com/auth/plus.login');
	    provider.addScope('profile');
	    
	    firebase.auth().signInWithPopup(provider).then(function(result) {
	      var token = result.credential.accessToken;
	      var user = result.user;

        // console.log('user');
	      successCallback("sign in success");
	    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;

        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('You have already signed up with a different auth provider for that email.');
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        } else {
          errorCallback(error);
        }
	    });
	} else {
    // console.log("sign out");
		firebase.auth().signOut();
    successCallback("sign out success");
	}
}