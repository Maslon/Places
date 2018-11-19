import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  @Output() closeSide = new EventEmitter<void>()

  constructor() { }

  ngOnInit() {
  }

  closeSideNav(){
    this.closeSide.emit()
  }
}
