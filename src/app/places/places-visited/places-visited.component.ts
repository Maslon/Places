import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-places-visited',
  templateUrl: './places-visited.component.html',
  styleUrls: ['./places-visited.component.css']
})
export class PlacesVisitedComponent implements OnInit {
  subscription: Subscription
  places: Place[]  

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.subscription = this.placesService.placesVisitedChanged.subscribe(places => this.places = places)
    this.placesService.setPlaces()
  }


  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
