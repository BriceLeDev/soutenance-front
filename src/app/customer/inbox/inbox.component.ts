import { Component, OnInit } from '@angular/core';
import { MessageControllerService } from '../../openapi/services/services';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { MessageResponse } from '../../openapi/services/models';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
import { Router } from '@angular/router';
@Component({
  selector: 'app-inbox',
  standalone: true,
  imports: [],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css',
})
export class InboxComponent implements OnInit{
  constructor(
    private messageService: MessageControllerService,
    private jwtService: JwtDecodeService,
     private route : Router
  ) {}

  public messages: Array<MessageResponse> = [];
  public email: string = '';

  ngOnInit(): void {
      this.getAllMessage()
  }

  public voirPlus(id: number | undefined) {
    // Vérifiez si les valeurs ne sont pas undefined avant de naviguer
    if (id) {
      this.route.navigate(['customer', 'abonnement', 'detail', id]);
    } else {
      console.error('Les paramètres sont manquants !');
    }
  }

  transformDate(dateString: string ): string {
    const date = new Date(dateString);
    console.log(formatDistanceToNow(date, { locale: fr }))
    return `Reçu il y a ${formatDistanceToNow(date, { locale: fr })}`;
  }
  getAllMessage() {
    this.email = this.jwtService.getEmail()
    this.messageService
      .getMessageByUser({
        userId: this.email,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.messages = data
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
