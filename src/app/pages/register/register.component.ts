import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegistrationFormRequest } from '../../openapi/services/models';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../openapi/services/services';
import { ToastrService } from 'ngx-toastr';
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
    private AuthService : AuthenticationService,
    private toastr: ToastrService

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

  // public register() {
  //   this.myerrore = [];
  //   this.AuthService.register1({
  //     body: this.registerRequest
  //   }).subscribe({
  //     next: resp => {
  //       this.route.navigate(['activate-account']);
  //       localStorage.setItem("registerEmail",this.registerRequest.email)
  //       console.log("res "+resp);
  //     },
  //     error: err => {
  //       if (err.error?.validationError) {
  //         this.myerrore = err.error.validationError;
  //         this.isOkay = false;
  //         console.log("Error "+err);
  //       }
  //     }
  //   })
  // }

  public register() {
    this.myerrore = [];
    this.AuthService.register1({
      body: this.registerRequest
    }).subscribe({
      next: resp => {
        this.route.navigate(['activate-account']);
        localStorage.setItem("registerEmail", this.registerRequest.email);
        console.log("Réponse reçue : ", resp);

        // Affichage d'un message de succès
        this.toastr.success(
          'Inscription réussie ! Veuillez activer votre compte.',
          'Succès',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
      },
      error: err => {
        console.log("Erreur reçue :", err);

        if (err.status === 409) {
          this.toastr.error(
            'Cet email est déjà utilisé. Veuillez en choisir un autre.',
            'Conflit',
            {
              positionClass: 'toast-top-center',
              timeOut: 5000,
              closeButton: true,
              progressBar: true
            }
          );
        } else if (err.status === 400 && err.error?.busynesErrorCode === 300) {
          this.myerrore = err.error.validationError;
          this.toastr.error(
            'Les mots de passe sont incorrects.',
            'Erreur de validation',
            {
              positionClass: 'toast-top-center',
              timeOut: 5000,
              closeButton: true,
              progressBar: true
            }
          );
        } else if (err.error?.validationError) {
          this.myerrore = err.error.validationError;
          this.toastr.error(
            'Erreur de validation. Vérifiez vos informations.',
            'Erreur de validation',
            {
              positionClass: 'toast-top-center',
              timeOut: 5000,
              closeButton: true,
              progressBar: true
            }
          );
        } else {
          this.toastr.error(
            'Une erreur inattendue est survenue. Veuillez réessayer.',
            'Erreur',
            {
              positionClass: 'toast-top-center',
              timeOut: 5000,
              closeButton: true,
              progressBar: true
            }
          );
        }
      }
    });
  }

  public login() {
    this.route.navigate(['login']);
  }
}
