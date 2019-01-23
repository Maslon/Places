import { Injectable } from "@angular/core";
import "leaflet"
declare let L

@Injectable({providedIn: "root"})

export class MapIcons {
    markerHtmlStyles = `
        width: 1.4rem;
        height: 1.4rem;
        display: block;
        left: -0.7rem;
        top: -0.7rem;
        position: relative;
        border-radius: 3rem 3rem 0;
        transform: rotate(45deg);
        border: 1px solid #FFFFFF;`

        
    greenIcon = L.divIcon({className: "icon",
        iconAnchor: [0, 12],
        labelAnchor: [-3, 0],
        popupAnchor: [0, -18],
        html: `<span style="${this.markerHtmlStyles} background-color: green " />`})
        
    redIcon = L.divIcon({className: "icon",
        iconAnchor: [0, 12],
        labelAnchor: [-3, 0],
        popupAnchor: [0, -18],
        html: `<span style="${this.markerHtmlStyles} background-color: red " />`})
        
    blueIcon = L.divIcon({className: "icon",
        iconAnchor: [0, 12],
        labelAnchor: [-3, 0],
        popupAnchor: [0, -18],
        html: `<span style="${this.markerHtmlStyles} background-color: blue " />`})     
}