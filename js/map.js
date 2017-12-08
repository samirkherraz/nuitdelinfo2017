var Map = function(){
  this.pos = {lat:0, lng:0};
  this.markerPos = null;
  this.posEvent = {lat:0, lng:0};
  this.markerEvent = null;
  this.map = null;
}

Map.prototype.geocodeAddress = function() {
  var geocoder = new google.maps.Geocoder();
  var address = document.getElementById('address').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    if (status === 'OK') {
      alert(results[0].geometry.location);
      this.map.setCenter(results[0].geometry.location);

      //setMapOnAll(null);

      this.marker = new google.maps.Marker({
        map: this.map,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}

Map.prototype.initMap = function(){
  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      this.pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };

      this.map = new google.maps.Map($("#map")[0], {
        center: this.pos,
        zoom: 8
      });

      this.marker = new google.maps.Marker({
        map: this.map,
        position: this.pos
      });

      //this.map.setZoom(12);
      //this.map.setCenter(this.pos);
    }, function() {
      handleLocationError(true, infoWindow, this.map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, this.map.getCenter());
  }
}
