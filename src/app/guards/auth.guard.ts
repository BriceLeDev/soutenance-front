import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authGaurds.service';
import { JwtDecodeService } from '../jwt/jwt-decode.service';

export const authGuard: CanActivateFn = () => {

 const route = inject(Router)
 const auhService = inject(AuthService)
 const jwtService = inject(JwtDecodeService)

 const profile = jwtService.getAuthorities()
 if ( jwtService.isTokenExpired() || !jwtService.getNomUtilisateur() ) {
     route.navigate(["login"]).then(()=> false)
     return false

 }

 if (!profile?.some(p=>p==="USER")) {
  //  route.navigateByUrl("/unauthorize")
   route.navigate(["unauthorize"]).then(()=> false)
   return false
 }

// if (!auhService.isAuthenticate) {
//   route.navigate(["login"])
//   return false
// }
return true;

};
