
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
  isVisited: boolean = false
  
  

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.getQueryParams()
    this.setPlace()
    console.log(this.isVisited)
  }

  getQueryParams(){
    this.route.queryParams.subscribe((queryParams: Params) => {
      this.isVisited = queryParams["finished"] === "1" ? true : false
    })
  }

  setPlace(){
    this.route.params.subscribe((params: Params) => {
      this.index = params["id"]
      if(this.isVisited){
        this.place = this.placesService.getVisitedPlace(this.index)
      }
       else {
        this.place = this.placesService.getPlaceTogo(this.index)       
      }
    })
  }

  onDelete(){
    this.placesService.deletePlace(this.index)
  }

  onVisited(){
    this.placesService.placeVisited(this.index)
  }
  
    

  
 

}