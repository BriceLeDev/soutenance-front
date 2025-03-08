import { authGuard } from './../../guards/auth.guard';
import { Component, inject } from '@angular/core';
import { LoginFormRequest } from '../../openapi/services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { routes } from '../../app.routes';
import { TokenService } from '../../token/token.service';
import { AuthenticationService } from '../../openapi/services/services';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  constructor(
    private router: Router,
    private AuthService: AuthenticationService,
    private tokenService:TokenService,
    private myservices : SharedServiceService,
    private jwtService : JwtDecodeService,
    private toastr: ToastrService
  ){}

  // private guardService = inject(authGuard)
  public AuthReques: LoginFormRequest = {
    email: '',
    password: '',
  };
  public myerrore: Array<String> = [];
  public isOkay: boolean = false;
  private isAuthenticate : boolean =false
  private profile : string[] | undefined
  private isLocked : string | undefined
  private isActive : string | undefined
//   public login() {

//     this.myerrore = []
//     this.AuthService.login({
//       body:this.AuthReques
//     }).subscribe({
//       next: resp => {
//         this.tokenService.setItem(resp.token as string)
//         // console.log(resp)
//         this.myservices.isAuthenticate = true
//          this.profile = this.jwtService.getAuthorities()
//         if (this.profile?.some(p => p ==="USER")) {
//           const redirectUrl = localStorage.getItem('redirectUrl') || '/customer/do-abonnement'; // URL sauvegardée ou page d'accueil
//           localStorage.removeItem('redirectUrl');
//           this.router.navigateByUrl(redirectUrl)
//         }else{
//           const redirectUrl = localStorage.getItem('redirectUrl') || '/admin/abonnements'; // URL sauvegardée ou page d'accueil
//           localStorage.removeItem('redirectUrl');
//           this.router.navigateByUrl(redirectUrl)
//         }
//         const decodedToken = this.jwtService.getDecodeToken();
//         console.log('Payload complet :', decodedToken);

//       },
//       error: err => {
//         if (err.error.validationError) {
//           this.myerrore = err.error.validationError;

//           // console.log(this.myerrore)
//           this.isOkay = false;

//         } else {
//           this.myerrore.push(err.error.error);
//         console.log("else err")
//           console.log(err.error)
//           this.isOkay = true;
//         }

//       }
//     })
// }
public login() {

  this.myerrore = [];
  this.AuthService.login({
    body: this.AuthReques
  }).subscribe({
    next: resp => {
      this.tokenService.setItem(resp.token as string);
      this.myservices.isAuthenticate = true;
      this.profile = this.jwtService.getAuthorities();

      if(this.isActive ==="false"){

        this.router.navigate(['activate-account']);
        this.toastr.error(
          'Compte non activé impossible de se connecter.Veuillez vérifier votre boite mail et saisir le code envoyé pour activer votre compte.',
          'Compte non activé',
          {
            positionClass: 'toast-top-center',
            timeOut: 100000,
            closeButton: true,
            progressBar: true
          }
        );
        localStorage.removeItem('registerEmail');
        return;
      }
      if(this.isLocked ==="false"){
        this.toastr.error(
          'Ce compte est bloqué, veuillez contacter All-Communication.',
          'Compte bloqué',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
        this.router.navigate(['activate-account']);
        return;
      }
      const redirectUrl = localStorage.getItem('redirectUrl') ||
                          (this.profile?.some(p => p === "USER")
                          ? '/customer/do-abonnement'
                          : '/admin/abonnements');

      localStorage.removeItem('redirectUrl');
      this.router.navigateByUrl(redirectUrl);

      const decodedToken = this.jwtService.getDecodeToken();
      console.log('Payload complet :', decodedToken);

      // Affichage d'un message de succès
      this.toastr.success('Connexion réussie !', 'Succès');
    },
    error: err => {
      console.log("Erreur reçue :", err);

      if (err.status === 401) {
        this.toastr.error(
          'Identifiants incorrects.Veuillez réessayer.Ou créez un compte si vous n\'en avez pas.',
          'Erreur de connexion',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
      } else if (err.status === 403) {
        this.toastr.error(
          'Accès refusé. Vous n\'avez pas les permissions nécessaires.',
          'Accès interdit',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
      } else if (err.error.validationError) {
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


  public loggout(){
    this.myservices.isAuthenticate = false

  }


  public register() {
  this.router.navigate(["register"])
  }
}
