import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';

@Component({
  selector: 'app-places-togo',
  templateUrl: './places-togo.component.html',
  styleUrls: ['./places-togo.component.css']
})
export class PlacesTogoComponent implements OnInit {
  subscription: Subscription
  places: Place[]  

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.subscription = this.placesService.placesTogoChanged.subscribe(places => this.places = places)
    this.placesService.setPlaces()
    // this.placesService.fetchGoPlaces()
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
