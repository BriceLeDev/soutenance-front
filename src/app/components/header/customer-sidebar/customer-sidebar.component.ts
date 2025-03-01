import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import { UserResponse } from '../../../openapi/services/models';
import { OwnerService } from '../../../openapi/services/services';
import { JwtDecodeService } from '../../../jwt/jwt-decode.service';
import { TokenService } from '../../../token/token.service';
import { th } from 'date-fns/locale';
@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './customer-sidebar.component.html',
  styleUrl: './customer-sidebar.component.css',
})
export class CustomerSidebarComponent implements OnInit {
  constructor(
    private userService: OwnerService,
    private decoder: JwtDecodeService,
    private router: Router,
    private tokenService : TokenService
  ) {}

  public user: UserResponse = {
    accountLocked: false,
    createdAT: '',
    email: '',
    enabled: true,
    fidelisation: false,
    id: 0,
    nonUtilisateur: '',
    numero: '',
    roleList: [],
    updateAt: '',
  };

  public username: string = '';

  ngOnInit(): void {
    this.getUser();
  }
  private getUser() {
    const email: string = this.decoder.getEmail();
    this.userService
      .getUserByEmail({
        email: email,
      })
      .subscribe({
        next: (data) => {
          this.user = data;
          this.username = this.user.nonUtilisateur
            .substring(0, 2)
            .toUpperCase();
          console.log(this.user);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public disconnect() {
    this.tokenService.removeItem()
    this.router.navigate(["/login"])
  }
}
