import { Component, OnInit } from '@angular/core';
import { Place } from '../place.model';

@Component({
  selector: 'app-places-togo',
  templateUrl: './places-togo.component.html',
  styleUrls: ['./places-togo.component.css']
})
export class PlacesTogoComponent implements OnInit {
  places: Place[] = [
    {
      name: "vidlakov",
      description: "pesky",
      picture: "https://www.milujemefotografii.cz/wp-content/uploads/2018/06/jak-fotit-krajinu-v-ruznych-podminkach-I-krajina-rano-vecer-i-v-noci-640x360.jpg",
      map: "tady bude mapa",
      finished: false
    },
    {
      name: "vidlakwafwov",
      description: "peskwfawfay",
      picture: "https://www.milujemefotografii.cz/wp-content/uploads/2018/06/jak-fotit-krajinu-v-ruznych-podminkach-I-krajina-rano-vecer-i-v-noci-640x360.jpg",
      map: "tady bude mapa",
      finished: false
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
