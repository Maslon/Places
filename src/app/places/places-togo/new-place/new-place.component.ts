import { PlacesService } from './../../places.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {

  constructor(private placesService: PlacesService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.placesService.addPlaceToDatabase(form.value)
  }
}
