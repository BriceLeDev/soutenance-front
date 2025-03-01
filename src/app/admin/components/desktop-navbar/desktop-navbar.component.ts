import { Component, inject } from '@angular/core';
import { SharedServiceService } from '../../admin-services/shared-service.service';
import { TokenService } from '../../../token/token.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-desktop-navbar',
  standalone: true,
  imports: [],
  templateUrl: './desktop-navbar.component.html',
  styleUrl: './desktop-navbar.component.css'
})
export class DesktopNavbarComponent {

  constructor(
    private tokenService : TokenService,
    private router : Router
  ){}

  public disconnect() {
    this.tokenService.removeItem()
    this.router.navigate(["/login"])
  }

}
