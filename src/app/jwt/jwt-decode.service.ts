import { inject, Injectable } from '@angular/core';
import { TokenService } from '../token/token.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { OwnerService } from '../openapi/services/services';
import { UserResponse } from '../openapi/services/models';

@Injectable({
  providedIn: 'root',
})
export class JwtDecodeService {
  constructor(
    private tokenService: TokenService,
    private userService: OwnerService
  ) {}
  private jwtToken: string | null = '';
  private decode: { [key: string]: any } = {};
  private user : UserResponse ={
    accountLocked: false,
    createdAT: "",
    email: "",
    enabled: true,
    fidelisation: false,
    id: 0,
    nonUtilisateur: "",
    numero: "",
    roleList: [],
    updateAt: "",
}
  decoderJwt() {
    this.jwtToken = this.tokenService.getItem();

    // if (this.jwtToken) {
    //    this.decode = jwtDecode<JwtPayload>(this.jwtToken)
    // }
    if (this.jwtToken) {
      try {
        this.decode = jwtDecode<{ [key: string]: any }>(this.jwtToken);
      } catch (error) {
        console.error('Erreur lors du décodage du JWT :', error);
        this.decode = {};
      }
    } else {
      console.warn('Aucun token trouvé.');
      this.decode = {};
    }
  }

  getDecodeToken() {
    this.decoderJwt();
    return this.decode;
  }

  getNomUtilisateur(): string | undefined {
    this.decoderJwt();
    return this.decode['NomUtilisateur'];
  }

  getEmail(): string {
    this.decoderJwt();
    return this.decode['sub'];
  }

  getExpiration(): number | undefined {
    this.decoderJwt();
    return this.decode['exp'];
  }

  /**
   * Obtenir les rôles utilisateur (`authorities`).
   */
  getAuthorities(): string[] | undefined {
    this.decoderJwt();
    return this.decode['authorities'];
  }

  /**
   * Vérifier si le token est expiré.
   */
  isTokenExpired(): boolean {
    const expiration = this.getExpiration();
    if (!expiration) {
      return true; // Si `exp` n'existe pas, considérer comme expiré
    }
    const currentTime = Math.floor(Date.now() / 1000); // Convertir la date actuelle en secondes
    return expiration < currentTime;
  }

  private getUser(){
    const email: string = this.getEmail();
    this.userService
      .getUserByEmail({
        email: email,
      })
      .subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
        },
        error: (error) => {
          console.log(error);
        },
      });

    
  }


}
