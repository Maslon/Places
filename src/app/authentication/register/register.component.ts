import { AuthService } from './../auth.service';
import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  authErr: string = ""

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authError.subscribe(error => {
      this.authErr = error
    })
  }

  onSubmit(form: NgForm){
    this.authService.registerUser(form.value)
  }
}
