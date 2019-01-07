import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng } from 'leaflet';
// import "leaflet-search"
// import * as leafletSearch from "leaflet-search"
// import * as L from 'leaflet'
declare let L
import "leaflet-search"



@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // searchLayer
  

  // options = {
  //   layers: [
  //     tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //       attribution: '&copy; OpenStreetMap contributors'
  //     })
  //   ],
  //   zoom: 7,
  //   center: latLng([ 46.879966, -121.726909 ])
  // };

  constructor() { }

  ngOnInit() {
    const map = L.map('map').setView([51.505, -0.09], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    // const searchLayer = L.layerGroup().addTo(map);
    // map.addControl( new L.Control.Search({layer: searchLayer}) );
    L.control.scale().addTo(map);

// Create a Tile Layer and add it to the map
//var tiles = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);
  var searchControl = new L.esri.Controls.Geosearch().addTo(map);

  var results = new L.LayerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

  }

  // onMapReady(map: L.Map){
  //   L.Control.Search
  // }

  // onMapReady(map: L.Map) {
  //   L.control.coordinates({}).addTo(map);
  // }
}
