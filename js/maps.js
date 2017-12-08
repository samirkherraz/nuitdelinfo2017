var map = new Vue({
  el: "#appMap",
  data: {
    map: null,
    marker: null,
    pos: null
  },
  methods: {
    log: function(msg) {
      console.log(msg);
    },/*
    getMeteoFromPos: function(pos) {
      this.log("http://www.infoclimat.fr/public-api/gfs/json?_ll=" + pos.lat + "," + pos.lng + "&_auth=UUsFElQqUHJQfVZhUiRSewBoUGVZL1B3VCgBYg9qAn8Eb1MyVTVQNgJsUSwBLlBmVHlTMA41CTkBagtzDX8DYlE7BWlUP1A3UD9WM1J9UnkALlAxWXlQd1Q2AWUPZgJ%2FBGVTNlUyUCwCb1E2ATVQelRmUzcONgkuAX0LbQ1lA2FRMAVnVDBQM1A3VjZSZ1J5ACxQNVk3UGpUPgFuDzMCZARmUz9VNlA6AjtRNwEzUHpUb1MxDjEJMgFlC28NYQNjUS0FflROUEFQIlZ0UiBSMwB1UC1ZM1A2VGM%3D&_c=da1f3459282872cfd35015afdee63be7");
    },*/
    initMap: function() {
      let obj = this;
      obj.map = new google.maps.Map(document.getElementById('map'), {
        center: {
          lat: 0,
          lng: 0
        },
        zoom: 8
      });
      // Try HTML5 geolocation.
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          obj.marker = new google.maps.Marker({
            map: obj.map,
            position: pos
          });

          obj.map.setZoom(12);
          obj.map.setCenter(pos);
        }, function() {
          handleLocationError(true, infoWindow, obj.map.getCenter());
        });
      } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, obj.map.getCenter());
      }
      var geocoder = new google.maps.Geocoder();

      document.getElementById('submit').addEventListener('click', function() {
        obj.geocodeAddress(geocoder, obj.map);
      });
    },
    geocodeAddress: function(geocoder, resultsMap) {
      var address = document.getElementById('address').value;
      geocoder.geocode({
        'address': address
      }, function(results, status) {
        if (status === 'OK') {
          alert(results[0].geometry.location);
          resultsMap.setCenter(results[0].geometry.location);

          //setMapOnAll(null);

          this.marker = new google.maps.Marker({
            map: resultsMap,
            position: results[0].geometry.location
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
  }
});
