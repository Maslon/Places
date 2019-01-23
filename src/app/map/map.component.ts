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
  placesTogoSubscription: Subscription

  constructor(private mapService: MapService,
              private iconsService: MapIcons,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 5)
    this.placesTogoSubscription = this.placesService.placesTogoChanged.subscribe(places => {
      places.forEach(place => this.togoCoor.push(place.coordinates))
      console.log(this.togoCoor)
      this.togoCoor.forEach(latlng => L.marker(latlng, {icon: this.iconsService.redIcon}).addTo(this.map))
      console.log(this.togoCoor)
    })
    this.placesService.setPlaces()
    // this.placesService.fetchGoPlaces()
    
    //map layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

    //left side controls    
    L.control.scale().addTo(this.map);
    L.easyButton("<span class='add'>Add selected city to your cities</span>", () => {
      this.mapService.createCity()
    }).addTo(this.map)
    let searchControl = new esrigeo.Geosearch().addTo(this.map);

    //on search
    const results = new L.LayerGroup().addTo(this.map);
    searchControl.on('results', (data) => {
      console.log(data)
      this.mapService.getCityName(data.text)
      this.mapService.fetchImages()
      this.mapService.setCityData()
      this.mapService.getCoordinates(data.latlng)
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng, {icon: this.iconsService.blueIcon}));
      }
    });
  }

  ngOnDestroy(){
    this.placesTogoSubscription.unsubscribe()
  }

}
