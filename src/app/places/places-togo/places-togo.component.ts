import { Component, OnInit, Input } from '@angular/core';
import { PlacesService } from '../places.service';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Place } from '../place.model';

@Component({
  selector: 'app-places-togo',
  templateUrl: './places-togo.component.html',
  styleUrls: ['./places-togo.component.css']
})
export class PlacesTogoComponent implements OnInit {
  subscription: Subscription
  places: Place[]  

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
