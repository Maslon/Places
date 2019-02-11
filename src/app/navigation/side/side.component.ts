import { AuthService } from './../../authentication/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.css']
})
export class SideComponent implements OnInit {
  @Output() closeSide = new EventEmitter<void>()
  isAuthenticated = false

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.logState.subscribe(state => this.isAuthenticated = state)
  }

  closeSideNav(){
    this.closeSide.emit()
  }

  onLogout(){
    this.authService.logout()
  }
}
