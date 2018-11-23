import { Component, OnInit, OnDestroy } from '@angular/core';
import { Place } from './place.model';
import { PlacesService } from './places.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit, OnDestroy {
  places: Place[]
  subscription: Subscription

  constructor(private placesService: PlacesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.placesService.placesChanged.subscribe(places => this.places = places)
    this.placesService.fetchGoPlaces()

  }

  onAdd(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
