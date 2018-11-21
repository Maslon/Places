/// <reference path="../../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit, AfterViewInit {
  place: Place
  index: number;
  map
  @ViewChild("myMap") myMap
  @ViewChild("searchInput") sInput
  @ViewChild("searchContainer") sContainer
  @ViewChild("printoutPanel") panel
  text: string;

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = params["id"]
      this.place = this.placesService.getPlace(this.index)
    })
    this.map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: "Asdww3lvu-L5BZ57ZGqInk6fqN_8A6BBIWYKPl67rkTJb8PlQOJTkyYv6KrnFRwd"
    })
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest',  () => {
      const options = {
        maxResults: 4,
        map: this.map 
      };
      const manager = new Microsoft.Maps.AutosuggestManager(options);
      manager.attachAutosuggest(this.sInput.nativeElement, this.sContainer.nativeElement, selectedSuggestion);
      console.log(this.sInput.nativeElement)
    });
    const selectedSuggestion = (suggestionResult) => {
      this.map.entities.clear()
      
      this.map.setView({bounds: suggestionResult.bestView});
      const pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
      this.map.entities.push(pushpin);
  
      this.panel.nativeElement.innerHtml = 'Suggestion: ' + suggestionResult.formattedSuggestion +
      '<br> Lat: ' + suggestionResult.location.latitude + 
      '<br> Lon: ' + suggestionResult.location.longitude;
  
    }
    
  }

  ngAfterViewInit(){
    
  }

  onKeyup(){
    
  }

  onClick(){

  }

  
 

}