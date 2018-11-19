import { Component, OnInit } from '@angular/core';
import { Place } from './place.model';
import { PlacesService } from './places.service';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  places: Place[]

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    this.places = this.placesService.getPlaces()
  }

}
