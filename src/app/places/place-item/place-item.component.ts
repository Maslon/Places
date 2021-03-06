import { Component, OnInit, Input } from '@angular/core';
import { Place } from '../place.model';

@Component({
  selector: 'app-place-item',
  templateUrl: './place-item.component.html',
  styleUrls: ['./place-item.component.css']
})
export class PlaceItemComponent implements OnInit {
  @Input() index: number;
  @Input() place: Place;
  isFinished = false

  constructor() { }

  ngOnInit() {
    this.isFinished = this.place.finished
  }

}
