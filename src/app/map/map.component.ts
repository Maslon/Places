import { Subscription } from 'rxjs';
import { MapService } from './map.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import "leaflet"
declare let L
import * as esrigeo from "esri-leaflet-geocoder"
import "leaflet-easybutton"
import { MapIcons } from './map-icons.service';
import { PlacesService } from '../places/places.service';




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  map
  searchedCity: string
  togoCoor = []
  visitedCoor = []
  placesTogoSubscription: Subscription
  placesVisitedSubscription: Subscription
  searchControl

  constructor(private mapService: MapService,
              private iconsService: MapIcons,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 5)
    this.addMarkers()
    this.placesService.setPlaces()
    this.addMapLayer()
    this.addMapControls()    
    this.onSearch()
    
  }

  addMarkers(){
    this.placesTogoSubscription = this.placesService.placesTogoChanged.subscribe(places => {
      places.forEach(place => this.togoCoor.push(place.coordinates))
      this.togoCoor.forEach(latlng => L.marker(latlng, {icon: this.iconsService.redIcon}).addTo(this.map))
    })
    this.placesVisitedSubscription =  this.placesService.placesVisitedChanged.subscribe(places => {
      places.forEach(place => this.visitedCoor.push(place.coordinates))
      this.visitedCoor.forEach(latlng => L.marker(latlng, {icon: this.iconsService.greenIcon}).addTo(this.map))
    })
  }

  addMapLayer(){
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);
  }

  addMapControls(){
    L.control.scale().addTo(this.map);
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
