import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PlacesService } from '../places.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
  animations: [
    trigger("descState", [
      state("hidden", style({
        display: "none",
        opacity: "0"
      })),
      state("shown", style({
        display: "block",
        opacity: "1"
      })),
      transition("hidden => shown", animate(800))
    ])
  ]
})
export class PlaceDetailComponent implements OnInit {
  state = "hidden"
  time = false
  imageLoaded = false
  imgSrc
  imageIndex: number
  place: Place
  index: number;
  isVisited: boolean = false
  animated = false;
  // descriptionShown = false;
  
  

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.imageIndex = 0;
    this.getQueryParams()
    this.setPlace()
    console.log(this.isVisited)
  }

  timeout(){
    setTimeout(() => this.time = true, 200)
  }
  

  onImageLoad(e){
    this.imageLoaded = true
  }

  nextImg(){
    this.imageIndex++
    this.imageIndex > this.place.images.length - 1 ?  this.imageIndex = 0 : null
    this.animated = true
    this.imageLoaded = false
    this.time = false
    this.timeout()
  }

  prevImg(){
    this.imageIndex--
    this.imageIndex === -1 ? this.imageIndex = this.place.images.length - 1 : null
    this.imageLoaded = false
    this.time = false
    this.timeout()
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

  showDesc(){
    this.state === "hidden" ? this.state = "shown" : this.state = "hidden"
    console.log(this.state)
    // this.descriptionShown = !this.descriptionShown
    // console.log(this.descriptionShown)
  }
  
    

  
 

}