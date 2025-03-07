import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { TokenService } from '../../token/token.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  constructor(
    private router: Router,
    private tokenService:TokenService,
    private jwtService : JwtDecodeService,

  ){}
  private profile : string[] | undefined

  public connect(){
    if ( !this.jwtService.isTokenExpired() ) {
      this.profile = this.jwtService.getAuthorities();
      const redirectUrl = (this.profile?.some(p => p === "USER")
                            ? '/customer/do-abonnement'
                            : '/admin/abonnements');
      this.router.navigate([redirectUrl]).then(()=> false)
      return ;
  }
  this.router.navigate(["/login"])

  }
}
