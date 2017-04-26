function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 0, lng: 0},
    zoom: 3,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ['botw']
    }
  });

  var botwMapType = new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
        var bound = Math.pow(2, zoom);
        // return 'http://mw1.google.com/mw-planetary/lunar/lunarmaps_v1/clem_bw' +
        //     '/' + zoom + '/' + normalizedCoord.x + '/' +
        //     (bound - normalizedCoord.y - 1) + '.jpg';
        return 'https://blog.sogn.io/zelda/map/'+zoom+'/'+zoom+'_'+coord.x+'_'+coord.y+".png";
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 7,
    minZoom: 0,
    // radius: 1738000,
    name: 'Botw'
  });

  map.mapTypes.set('botw', botwMapType);
  map.setMapTypeId('botw');

  map.addListener('click', function(e) {
    alert(e.latLng);
  });
}

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.850033, lng: -87.6500523},
    zoom: 11
  });

  var layer = new google.maps.FusionTablesLayer({
    query: {
      select: '\'Geocodable address\'',
      from: '1mZ53Z70NsChnBMm-qEYmSDOvLXgrreLTkQUvvg'
    }
  });
  layer.setMap(map);
}