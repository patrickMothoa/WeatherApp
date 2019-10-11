import { Component, NgZone } from '@angular/core';
import { WeatherserviceService } from '../weatherservice.service';
import { Platform } from '@ionic/angular';

declare var google;
var map;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  getTemper : any;

  Citiez = [];
  array =[];
  markers=[];
  city : string = "";
  temp;
  min;
  max;

  //////
  ///
  mapz : any;
 // markers : any;
  autocomplete: any;
  GoogleAutocomplete: any;
  GooglePlaces: any;
  geocoder: any
  autocompleteItems: any;

  constructor(public zone: NgZone,public weatherservice : WeatherserviceService, public platform: Platform ) {
   ////
   this.GoogleAutocomplete = new google.maps.places.AutocompleteService();
   this.autocomplete = { input: '' };
   this.autocompleteItems = [];
   this.geocoder = new google.maps.Geocoder;
   this.markers = [];
   ///
  }

  ngOnInit() {
    // Since ngOnInit() is executed before deviceready event,
     // you have to wait the event.
     this.platform.ready(); 
     this.initMap()
  }

  initMap() {
   
    var infoWindowMarker;
    var selectedMarker
    var  infoWindow
 
    map = new google.maps.Map(document.getElementById('map_canvas'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 17
    });
  
    infoWindow = new google.maps.InfoWindow;
    infoWindowMarker= new google.maps.InfoWindow; 
  
     // Get the location of user
     if (navigator.geolocation) {
      //this.array =[]
      navigator.geolocation.getCurrentPosition((position)=> {
        var pos=[]
        pos.push({
        location: new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
          });
               ///
        let marker = new google.maps.Marker({
          position: pos[0].location,
          zoom: 17,
          map: map
  
        });
        this.markers.push(marker);
        map.setCenter(pos[0].location);
            ///
        infoWindow.setPosition(pos[0].location);
        infoWindow.setContent('Your Location.');
        infoWindow.open(map);
        map.setCenter(pos[0].location);
  ​
  
  ///popular map with crime hotspots end
        this.array.push(pos[0])
        console.log(this.array);
        
      }, () => {
        this.handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, map.getCenter());
    }
  }
  
  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
                          'Error: The Geolocation service failed.' :
                          'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
  }

   ////////////////////////  getting different places
updateSearchResults(){
  console.log(this.autocomplete.input);
  
    if (this.autocomplete.input == '') {
      this.autocompleteItems = [];
      return;
    }
    this.GoogleAutocomplete.getPlacePredictions({ input: this.autocomplete.input },
    (predictions, status) => {
      this.autocompleteItems = [];
      this.zone.run(() => {
        predictions.forEach((prediction) => {
          this.autocompleteItems.push(prediction);
        });
      });
    });
  }
  /////////////////////////// selecting a particular place
selectSearchResult(item){
   this.autocompleteItems = [];

    //Set latitude and longitude of user place
    this.mapz = new google.maps.Map(document.getElementById('map_canvas'), {
      center: {lat: -34.075007, lng: 20.23852},
      zoom: 15
    });
 
   this.geocoder.geocode({'placeId': item.place_id}, (results, status) => {
     if(status === 'OK' && results[0]){
       let position = {
           lat: results[0].geometry.location.lat,
           lng: results[0].geometry.location.lng
       };
 
       let marker = new google.maps.Marker({
         position: results[0].geometry.location,
         map: this.mapz,
       });
       this.markers.push(marker);
       this.mapz.setCenter(results[0].geometry.location);
     }
   })
 }
  
  ////////////////////////////////////////////////////////////////////////////////

  Location(){
    this.weatherservice.myWeather(this.city).subscribe((data)=>{
      this.getTemper = data;
      console.log(this.getTemper);
      

      this.temp = Math.round(this.getTemper.main.temp - 273.25);
      this.min = Math.round(this.getTemper.main.temp_min - 273.25);
      this.max = Math.round(this.getTemper.main.temp_max - 273.25);
    })
  }
}
