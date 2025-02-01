import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authGaurds.service';
import { JwtDecodeService } from '../jwt/jwt-decode.service';

export const authAdminGuard: CanActivateFn = () => {

  const route = inject(Router)
   const auhService = inject(AuthService)
   const jwtService = inject(JwtDecodeService)

   const profile = jwtService.getAuthorities()
  if (jwtService.isTokenExpired()|| !jwtService.getNomUtilisateur()) {
    const currentUrl = route.url; // Récupérer l'URL actuelle
    localStorage.setItem('redirectUrl', currentUrl);
    route.navigateByUrl("/login")
   return false
  }else if (!profile?.some(p=>p==="ADMIN")) {
    route.navigateByUrl("/unauthorize")
   return false
  }
  return true;
};
