/// <reference path="../../../../../node_modules/bingmaps/types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />

import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Place } from '../../place.model';
import { ActivatedRoute, Params } from '@angular/router';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.component.html',
  styleUrls: ['./place-detail.component.css']
})
export class PlaceDetailComponent implements OnInit {
  place: Place
  index: number;
  @ViewChild("myMap") myMap

  constructor(private route: ActivatedRoute,
              private placesService: PlacesService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.index = params["id"]
      this.place = this.placesService.getPlace(this.index)
    })
    const map = new Microsoft.Maps.Map(this.myMap.nativeElement, {
      credentials: "Asdww3lvu-L5BZ57ZGqInk6fqN_8A6BBIWYKPl67rkTJb8PlQOJTkyYv6KrnFRwd"
    })
  }


}