import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  authErr = ""

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authError.subscribe(error => {
      this.authErr = error
    })
  }

  onSubmit(form: NgForm){
    this.authService.loginUser(form.value)
  }
}
