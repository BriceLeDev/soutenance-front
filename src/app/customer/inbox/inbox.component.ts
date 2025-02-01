import { Component, OnInit } from '@angular/core';
import { MessageControllerService } from '../../openapi/services/services';
import { Message } from '../../openapi/services/models';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';

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
    private jwtService: JwtDecodeService
  ) {}

  public messages: Array<Message> = [];
  public email: string = '';

  ngOnInit(): void {
      this.getAllMessage()
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
