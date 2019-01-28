import { Subscription } from 'rxjs';
import { MapService } from './map.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import "leaflet"
declare let L
import * as esrigeo from "esri-leaflet-geocoder"
import "leaflet-easybutton"
import { MapIcons } from './map-icons.service';
import { PlacesService } from '../places/places.service';
import { Router, Params } from '@angular/router';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  map
  searchedCity: string
  placesTogoSubscription: Subscription
  placesVisitedSubscription: Subscription
  searchControl
  bounds = new L.LatLngBounds(new L.LatLng(-90,-180), new L.LatLng(90,180))

  constructor(private mapService: MapService,
              private iconsService: MapIcons,
              private placesService: PlacesService,
              private router: Router) { }

  ngOnInit() {
    this.map = L.map('map', {
      minZoom: 3,
      maxBounds: this.bounds,
      maxBoundsViscosity: 1
    }).setView([51.505, -0.09], 5)
    this.addMarkers()
    this.placesService.setPlaces()
    this.addMapLayer()
    this.addMapControls()    
    this.onSearch()
    
  }

  addMarkers(){
    this.placesTogoSubscription = this.placesService.placesTogoChanged.subscribe(places => {
      places.forEach((place, index) => {
        L.marker(place.coordinates, {icon: this.iconsService.redIcon}).addTo(this.map).bindPopup(place.name).on("mouseover", function() {
          this.openPopup()
        }).on("mouseout", function(){
          this.closePopup()
        }).on("click", () => {
          this.router.navigate(["/places", index], {queryParams: {finished : place.finished ? 1 : 0}})
        })     
      })
    })
    this.placesVisitedSubscription = this.placesService.placesVisitedChanged.subscribe(places => {
      places.forEach((place, index)=> {
        L.marker(place.coordinates, {icon: this.iconsService.greenIcon}).addTo(this.map).bindPopup(place.name).on("mouseover", function() {
          this.openPopup()
        }).on("mouseout", function(){
          this.closePopup()
        }).on("click", () => {
          this.router.navigate(["/places", index], {queryParams:{finished : place.finished ? 1 : 0}})
        })        
      })
    })
  }


  addMapLayer(){
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map)
  }

  addMapControls(){
    L.control.scale().addTo(this.map);

    //create city button

    L.easyButton("<span class='add'>Add selected city to your cities</span>", () => {
      this.mapService.createCity()
    }).addTo(this.map)
    
    this.searchControl = new esrigeo.Geosearch().addTo(this.map);
  }

  onSearch(){
    const results = new L.LayerGroup().addTo(this.map);
    this.searchControl.on('results', (data) => {
      this.mapService.getCityData(data.text, data.latlng)
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng, {icon: this.iconsService.blueIcon}));
      }
    })
  }

  ngOnDestroy(){
    this.placesTogoSubscription.unsubscribe()
  }

}
