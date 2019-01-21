import { MapService } from './map.service';
import { Component, OnInit } from '@angular/core';
import "leaflet"
declare let L
import * as esrigeo from "esri-leaflet-geocoder"
import "leaflet-easybutton"




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map
  searchedCity: string

  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 5)
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    L.control.scale().addTo(this.map);
    L.easyButton("<span class='add'>Add selected city to your cities</span>", () => {
      this.mapService.createCity()
    }).addTo(this.map)
    let searchControl = new esrigeo.Geosearch().addTo(this.map);
    const results = new L.LayerGroup().addTo(this.map);
    searchControl.on('results', (data) => {
      console.log(data)
      this.mapService.getCityName(data.text)
      this.mapService.fetchImages()
      this.mapService.setCityData()
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });
  }

}
