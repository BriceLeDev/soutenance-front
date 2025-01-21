/*
 ***************************************************************
 * Composent table gestion des messages                     *
 ***************************************************************
 */
import { Component, OnInit, inject, signal } from '@angular/core';
import { AdministrationService } from '../../admin-services/administration-service.service';
import { SharedServiceService } from '../../admin-services/shared-service.service';
import { Message } from '../../../model/Message';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
})
export class NewMessageComponent implements OnInit {
  private adminService = inject(AdministrationService);
  private AdminState = inject(SharedServiceService);
  private router = inject(Router);
  public MessageTable!: Message[];
  public message!: Message;
  public error!: string;

  ngOnInit(): void {
    this.getAllMessage();
  }

  getAllMessage() {
    this.adminService.getAllMessage().subscribe({
      next: (data) => {
        this.MessageTable = data;
      },
      error: (err) => {
        this.error = err;
      },
    });
  }

  public handlClick(message: Message) {
    this.router.navigateByUrl(`admin/detail/message/${message.id}`);
    this.adminService.checkMessage(message).subscribe({
      next: (data) => {
        this.message = data;
        this.getAllMessage();

      },
      error: (err) => {
        this.error = err;
      },
    });
  }
}
