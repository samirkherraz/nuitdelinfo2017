/* Fichier de définition de l'application */
var app = new Vue({
  el:"#app",
  data: {
    map: 0,
  },
  methods: {
    log : function(msg){
      console.log(msg);
    },
    initMap : function(){
      map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 8
      });
    }
  }
});
