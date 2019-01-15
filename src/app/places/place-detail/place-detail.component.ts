import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PlacesService } from '../places.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  // animations: [
  //   trigger("imgState", [
  //     state("selected", style({
  //       transform: 'translateX(0)'
  //     })),
  //     transition("void => *", [
  //       style({
  //         transform: 'translateX(100px)'
  //       }),
  //       animate(300)
  //     ])
  //   ])
  // ]
})
export class PlaceDetailComponent implements OnInit {
  // state = "not-selected"
  imageIndex: number
  place: Place
  index: number;
  isVisited: boolean = false
  animated = false;
  
  

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.imageIndex = 0;
    this.getQueryParams()
    this.setPlace()
    console.log(this.isVisited)
  }

  nextImg(){
    this.imageIndex++
    this.imageIndex > this.place.images.length - 1 ?  this.imageIndex = 0 : null
    this.animated = true
  }

  prevImg(){
    this.imageIndex--
    this.imageIndex === -1 ? this.imageIndex = this.place.images.length - 1 : null
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
    this.placesService.deletePlace(this.index, this.isVisited)
  }

  onVisited(){
    this.placesService.placeVisited(this.index)
  }

  onGoAgain(){
    this.placesService.placeGoAgain(this.index)
  }
  
    

  
 

}