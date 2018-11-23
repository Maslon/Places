import { PlacesService } from './../../places.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-place',
  templateUrl: './new-place.component.html',
  styleUrls: ['./new-place.component.css']
})
export class NewPlaceComponent implements OnInit {

  constructor(private placesService: PlacesService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
    this.placesService.addPlaceToDatabase(form.value)
    this.router.navigate([".."], {relativeTo: this.route})
  }
}
