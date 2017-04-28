// Firebase
var fbConfig = {
  apiKey: "AIzaSyCIKZLOCf2X25EcdVRbzjHYhuh5W5uNZvA",
  authDomain: "zelda-1492739821588.firebaseapp.com",
  databaseURL: "https://zelda-1492739821588.firebaseio.com",
  projectId: "zelda-1492739821588",
  storageBucket: "zelda-1492739821588.appspot.com",
  messagingSenderId: "142131556390"
};
firebase.initializeApp(fbConfig);

function initApp() {
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById('info').textContent = JSON.stringify(user, null, '  ');
    } else {
      document.getElementById('info').textContent = '';
    }

    document.getElementById('sign-in').disabled = false;
  });

  document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
}

function toggleSignIn() {
  if (!firebase.auth().currentUser) {
    var provider = new firebase.auth.GoogleAuthProvider();
    //provider.addScope('https://www.googleapis.com/auth/plus.login');
    provider.addScope('profile');
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      document.getElementById('token').textContent = JSON.stringify(result, null, '  ');
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
        console.error(error);
      }
    });
  } else {
    firebase.auth().signOut();
  }

  document.getElementById('sign-in').disabled = true;
}

// Map API
var tileIndex = {
  "3": { xmin: 1, xmax: 6, ymin: 1, ymax: 6 },
  "4": { xmin: 2, xmax: 12, ymin: 3, ymax: 12 },
  "5": { xmin: 4, xmax: 27, ymin: 6, ymax: 25 },
  "6": { xmin: 8, xmax: 55, ymin: 12, ymax: 51 },
  "7": { xmin: 17, xmax: 110, ymin: 24, ymax: 103 }
};

var map;

function initMap() {
  var allowedBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(-72, -130),
    new google.maps.LatLng(72, 130)
  );

  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['botw']
    },
    backgroundColor: '#000000'
  });

  var mapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      if (tileExists(zoom, coord.x, coord.y)) {
        return './map/'+zoom+'/'+zoom+'_'+coord.x+'_'+coord.y+'.png';
      } else {
        return './map/blank.png'
      }
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 7,
    minZoom: 3,
    name: 'map'
  });

  map.mapTypes.set('map', mapType);
  map.setMapTypeId('map');

  map.addListener('click', function(e) {
    alert(e.latLng);
  });

  var lastValidCenter = map.getCenter();
    
  google.maps.event.addListener(map, 'center_changed', function() {
    if (allowedBounds.contains(map.getCenter())) {
        lastValidCenter = map.getCenter();
        return; 
    }

      map.panTo(lastValidCenter);
  });
};

function tileExists(z, x, y) {
  var obj = tileIndex[String(z)];
  return (x >= obj.xmin && x <= obj.xmax && y >= obj.ymin && y <= obj.ymax);
}