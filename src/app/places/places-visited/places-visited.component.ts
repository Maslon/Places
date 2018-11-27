import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-places-visited',
  templateUrl: './places-visited.component.html',
  styleUrls: ['./places-visited.component.css']
})
export class PlacesVisitedComponent implements OnInit {
  subscription: Subscription
  places: Place[]  

  constructor(private placesService: PlacesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.placesService.placesChanged.subscribe(places => this.places = places)
    // this.placesService.fetchVisitedPlaces()
  }



  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
