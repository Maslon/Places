import { Component, OnInit } from '@angular/core';
import { Place } from './place.model';
import { PlacesService } from './places.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {
  places: Place[]

  constructor(private placesService: PlacesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.places = this.placesService.getPlaces()
  }

  onAdd(){
    this.router.navigate(["new"], {relativeTo: this.route})
  }

}
