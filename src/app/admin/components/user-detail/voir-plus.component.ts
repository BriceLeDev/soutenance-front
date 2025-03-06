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
import { UserResponse } from '../../../openapi/services/models';
import { JwtDecodeService } from '../../../jwt/jwt-decode.service';

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
  ClientId : string = "";
  customerService = inject(OwnerService);
  decoder = inject(JwtDecodeService);
  theerror = '';
  isFidel : boolean = false;
  isBlocked : boolean = false;
   public username : string = ""
   public user : UserResponse={
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
  ngOnInit(): void {
    this.ClientId = this.ActiveRoute.snapshot.params['id'];
    console.log(this.ClientId);
    // this.getUser()
    this.getClientById(Number.parseInt(this.ClientId) );
  }

  //avoir un clien par son id
  getClientById(Id: number) {
    this.customerService.getTheUserById(
      {
        userId : Id
      }
    ).subscribe({
      next: (value) => {
        this.user = value
        console.log(value)
      },
      error: (er) => {
        this.theerror = er;
        // console.log(er);
      },
    });
  }
  remooveClientFidele(Id: number) {
    this.customerService.removeUserFidelisation(
      {
        'owner-id': Id
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (er) => {
        this.theerror = er;
        // console.log(er);
      },
    });
  }
  setClientFidele(Id: number) {
    this.customerService.updateUserFidelisationToFalse(
      {
        'owner-id': Id
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (er) => {
        this.theerror = er;
        // console.log(er);
      },
    });
  }
  ClientBlocked(Id: number) {
    this.customerService.updateUserBlocked(
      {
        'owner-id': Id
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (er) => {
        this.theerror = er;
        // console.log(er);
      },
    });
  }
  ClientDeblock(Id: number) {
    this.customerService.updateUserDeBlocked(
      {
        'owner-id': Id
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
      },
      error: (er) => {
        this.theerror = er;
        // console.log(er);
      },
    });
  }

  private getUser(){
    const email : string  = this.decoder.getEmail()
    this.customerService.getUserByEmail({
      email: email
    }).subscribe({
      next : (data) =>{
        this.user = data
        this.username = this.user.nonUtilisateur.substring(0,2).toUpperCase()
        console.log(this.user)
      },
      error: (error)=>{
        console.log(error)
      }
    })
  }


}
