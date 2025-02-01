import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationFormRequest } from '../../openapi/services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../openapi/services/services';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(
    private route: Router,
    private AuthService : AuthenticationService


  ) {}

  public registerRequest: RegistrationFormRequest = {
    confirmPassword:"",
    email: '',
    nonUtilisateur: '',
    password: '',
    numero:""
  };

  public myerrore: Array<String> = [];
  public isOkay: boolean = false;

  public register() {
    this.myerrore = [];
    this.AuthService.register1({
      body: this.registerRequest
    }).subscribe({
      next: resp => {
        this.route.navigate(['activate-account']);
        localStorage.setItem("registerEmail",this.registerRequest.email)
        console.log("res "+resp);
      },
      error: err => {
        if (err.error?.validationError) {
          this.myerrore = err.error.validationError;
          this.isOkay = false;
          console.log("Error "+err);
        }
      }
    })
  }
  public login() {
    this.route.navigate(['login']);
  }
}
