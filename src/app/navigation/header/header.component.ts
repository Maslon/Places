import { AuthService } from './../../authentication/auth.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() toggleSide = new EventEmitter<void>()
  isAuthenticated = false

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.logState.subscribe(state => this.isAuthenticated = state)
  }

  onNavToggle(){
    this.toggleSide.emit()
  }

  onLogout(){
    this.authService.logout()
  }
}
