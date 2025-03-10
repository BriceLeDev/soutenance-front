import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
import {
  MessageResponse,
  UserResponse,
} from '../../../openapi/services/models';
import {
  MessageControllerService,
  OwnerService,
} from '../../../openapi/services/services';
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
    private tokenService: TokenService,
    private messageService: MessageControllerService
  ) {}

  NbrMsg: number = 0;
  prevMsgCount: number = 0;
  public messages: Array<MessageResponse> = [];
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
    this.getAllMessage();
  }

  getAllMessage() {
    const email: string = this.decoder.getEmail();
    this.messageService
      .getMessageByUser({
        userId: email,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messages = data;
          const previousCount = this.NbrMsg;
          this.messages = data;
          this.NbrMsg = this.messages.length;
          console.log('Nouveaux messages  this.displayNewMessageIcon();');
          console.log(this.NbrMsg);
          console.log(this.prevMsgCount);
          console.log('Nouveaux messages  this.displayNewMessageIcon();');
          // Met à jour prevMsgCount après avoir traité les messages
          this.prevMsgCount = this.NbrMsg;
          console.log(this.prevMsgCount);
          // Si le nombre de messages a changé, nous avons de nouveaux messages
          if (this.NbrMsg > previousCount) {
            // Ajoutez une logique pour afficher l'icône de message si de nouveaux messages arrivent
            console.log('Nouveaux messages  this.displayNewMessageIcon();');
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
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
    this.tokenService.removeItem();
    this.router.navigate(['/login']);
  }
}
