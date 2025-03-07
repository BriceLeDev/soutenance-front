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
import {MatTabsModule} from '@angular/material/tabs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-voir-plus',
  standalone: true,
  imports: [MatTabsModule],
  templateUrl: './voir-plus.component.html',
  styleUrl: './voir-plus.component.css',
})
export class VoirPlusComponent implements OnInit {

  constructor( private toastr: ToastrService){

 }

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
    this.getClientById();
  }

  //avoir un clien par son id
  getClientById() {
    this.customerService.getTheUserById(
      {
        userId :  Number(this.ClientId)
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
  remooveClientFidele() {
    this.customerService.removeUserFidelisation(
      {
        'owner-id':  Number(this.ClientId)
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
        this.toastr.success(
          'Le droit de fidélité a été retiré pour ce client.',
          'Fidélisation',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
      },
      error: (er) => {
        this.theerror = er;
        // console.log(er);
      },
    });
  }
  setClientFidele() {
    this.customerService.updateUserFidelisationToFalse(
      {
        'owner-id': Number(this.ClientId)
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
        this.toastr.success(
          'Le droit de fidélité a été ajouté pour ce client.',
          'Fidélisation',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
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
        'owner-id':  Number(this.ClientId)
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
        this.toastr.success(
          'Ce client est bloqué avec succès.',
          'Fidélisation',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
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
        'owner-id':  Number(this.ClientId)
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
