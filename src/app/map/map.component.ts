import { Component, OnInit } from '@angular/core';
// import "leaflet-search"
// import * as leafletSearch from "leaflet-search"
// import * as L from 'leaflet'
import "leaflet"
declare let L
// import * as L from 'leaflet'
import "leaflet-search"
// import "esri-leaflet"
import * as esri from "esri-leaflet"
// import "esri-leaflet-geocoder"
import * as esrigeo from "esri-leaflet-geocoder"




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
    console.log(L)
    console.log(esri)
    console.log(esrigeo)

    // console.log(esri)
    // console.log(esrigeo)

    let map = L.map('map').setView([51.505, -0.09], 13)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
    // const searchLayer = L.layerGroup().addTo(map);
    // map.addControl( new L.Control.Search({layer: searchLayer}) );
    L.control.scale().addTo(map);

// Create a Tile Layer and add it to the map
//var tiles = new L.tileLayer('http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.png').addTo(map);
  let searchControl = new esrigeo.Geosearch().addTo(map);

  const results = new L.LayerGroup().addTo(map);
  searchControl.on('results', function(data){
    results.clearLayers();
    for (let i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });
  console.log(esri)

  }

  // onMapReady(map: L.Map){
  //   L.Control.Search
  // }

  // onMapReady(map: L.Map) {
  //   L.control.coordinates({}).addTo(map);
  // }
}
