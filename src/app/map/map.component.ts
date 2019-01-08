import { Component, OnInit } from '@angular/core';
import "leaflet"
declare let L
import * as esrigeo from "esri-leaflet-geocoder"




@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  map

  constructor() { }

  ngOnInit() {
    this.map = L.map('map').setView([51.505, -0.09], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    L.control.scale().addTo(this.map);
    let searchControl = new esrigeo.Geosearch().addTo(this.map);

    const results = new L.LayerGroup().addTo(this.map);
    searchControl.on('results', function(data){
      console.log(data)
      results.clearLayers();
      for (let i = data.results.length - 1; i >= 0; i--) {
        results.addLayer(L.marker(data.results[i].latlng));
      }
    });

  }

}
