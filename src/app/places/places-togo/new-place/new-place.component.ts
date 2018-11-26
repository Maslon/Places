import { Place } from './../../place.model';
import { PlacesService } from './../../places.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {
  edit = false
  place: Place
  index: number
  placesForm: FormGroup

  constructor(private placesService: PlacesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if(params["id"]){
        this.index = +params["id"]
        this.edit = true
        this.place = this.placesService.getPlace(this.index)
      }
      this.initializeForm()
    })

  }

  initializeForm(){
    let name = ""
    let image = ""
    let desc = ""

    if(this.edit){
      name = this.place.name
      image = this.place.image
      desc = this.place.description
    }

    this.placesForm = new FormGroup({
      "name": new FormControl(name, Validators.required),
      "image": new FormControl(image, Validators.required),
      "description": new FormControl(desc, Validators.required)
    })
  }

  onSubmit(){
    if(!this.edit){
      this.placesService.addPlaceToDatabase(this.placesForm.value)
    } else {
      this.placesService.updatePlace(this.placesForm.value, this.index)
    }
    this.router.navigate([".."], {relativeTo: this.route})
  }
}
