import { Component, OnInit, ViewChild } from '@angular/core';
import { Place } from '../place.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PlacesService } from '../places.service';
import { MatDialog } from '@angular/material';
import { DeletePlaceComponent } from './delete-place.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css'],
 
})
export class PlaceDetailComponent implements OnInit {
  @ViewChild("text") textArea
  // @ViewChild("img") img
  addNoteClicked = false
  firstImage = true
  time = false
  imageLoaded = false
  imageIndex: number
  place: Place
  index: number;
  isVisited: boolean = false
  animated = false;
  descriptionShown = false;
  notesShown = false;
  boxChecked: boolean
  
  

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService,
              private dialog: MatDialog) { }

  ngOnInit() {
    this.imageIndex = 0;
    this.getQueryParams()
    this.setPlace()
    console.log(this.isVisited)
  }

  timeout(){
    setTimeout(() => this.time = true, 200)
    this.firstImage = false
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
    const dialogRef = this.dialog.open(DeletePlaceComponent)
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.placesService.deletePlace(this.index, this.isVisited)
      }
    })
  }


  onToggleAdd(){
    event.stopPropagation()
    this.addNoteClicked = !this.addNoteClicked
  }

  onShowNotes(){
    if(!this.addNoteClicked){
      this.notesShown = !this.notesShown
    }
  }


  async onSaveNote(){
    event.stopPropagation()
    const note = this.textArea.nativeElement.value
    console.log(this.textArea.nativeElement.value)
    if(note !== ""){
      await this.placesService.addNoteToDatabase(this.place, this.index, this.textArea.nativeElement.value)
      this.setPlace()
    }
    this.textArea.nativeElement.value = ""
  }

  async onDeleteNote(index){
    await this.placesService.deleteNote(index, this.place, this.index)
    this.setPlace()
  }

  onBoxCheck(e){
    e.checked ? this.placesService.placeVisited(this.index) :  this.placesService.placeGoAgain(this.index)

  }

}