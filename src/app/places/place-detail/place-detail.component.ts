
import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PlacesService } from '../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  place: Place
  index: number;
  

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = params["id"]
      this.place = this.placesService.getPlaceTogo(this.index)
      this.placesService.placesChanged.subscribe(places => {
        this.place = places[this.index]
      })
    })
  }

  onDelete(){
    this.placesService.deletePlace(this.index)
  }
  
    

  
 

}