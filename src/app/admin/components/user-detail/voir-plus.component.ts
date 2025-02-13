/*
 *****************************************************************
 * Composent Voir plus de détail sur un client                   *
 *****************************************************************
 */

import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../model/Client';
import { AdministrationService } from '../../admin-services/administration-service.service';
import { error } from 'console';
import { OwnerService } from '../../../openapi/services/services';

@Component({
  selector: 'app-voir-plus',
  standalone: true,
  imports: [],
  templateUrl: './voir-plus.component.html',
  styleUrl: './voir-plus.component.css',
})
export class VoirPlusComponent implements OnInit {
  ActiveRoute = inject(ActivatedRoute);
  public clientget!: Client;
  ClientId = this.ActiveRoute.snapshot.params['id'];
  customerService = inject(OwnerService);
  theerror = '';

  ngOnInit(): void {
    this.getClientById(this.ClientId);
  }

  //avoir un clien par son id
  getClientById(Id: number) {
    this.customerService.getUserByEmail(
      {
        email : ""
      }
    ).subscribe({
      next: (value) => {
        // this.clientget = value;
        // console.log(value);
      },
      error: (er) => {
        this.theerror = er;
        // console.log(er);
      },
    });
  }
}
