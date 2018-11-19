import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../place.model';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-places-togo',
  templateUrl: './places-togo.component.html',
  styleUrls: ['./places-togo.component.css']
})
export class PlacesTogoComponent implements OnInit {
  @Input() index: number;
  @Input() place: Place
  

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
  }

}
