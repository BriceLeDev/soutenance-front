import { Component, OnInit } from '@angular/core';
import { UserResponse } from '../../openapi/services/models';
import { Router } from '@angular/router';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { OwnerService } from '../../openapi/services/services';
import { TokenService } from '../../token/token.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  constructor(
    private userService: OwnerService,
    private decoder: JwtDecodeService,
    private tokenService : TokenService
  ) {}
  public username: string = '';
  
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
}
