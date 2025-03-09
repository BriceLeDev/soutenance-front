/*
 *****************************************************************
 * Composent Voir plus de détail sur un client                   *
 *****************************************************************
 */

import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
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

  constructor( private toastr: ToastrService,private cdr: ChangeDetectorRef){

 }

  ActiveRoute = inject(ActivatedRoute);
  public clientget!: Client;
  ClientId : string = "";
  customerService = inject(OwnerService);
  decoder = inject(JwtDecodeService);
  theerror = '';
  isFidel : boolean = true;
  isBlocked : boolean = true;
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
        this.isFidel = false;
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
        this.toastr.error(
          'Le droit de fidélité a été  déjà retiré pour ce client.',
          'Fidélisation',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
        // console.log(er);
      },
    });
    this.cdr.detectChanges();
  }
  setClientFidele() {
    this.customerService.updateUserFidelisationToFalse(
      {
        'owner-id': Number(this.ClientId)
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
        this.isFidel = true;
        this.toastr.success(
          'Ce client a été fidélisé avec succès.',
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
        this.toastr.error(
          'Ce client a été déjà fidélisé.',
          'Fidélisation',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
        // console.log(er);
      },
    });
    this.cdr.detectChanges();
  }
  ClientBlocked() {
    this.customerService.updateUserBlocked(
      {
        'owner-id':  Number(this.ClientId)
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
        this.isBlocked = true;
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
        this.toastr.error(
          'Ce client est déjà bloqué avec succès.',
          'Fidélisation',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
        // console.log(er);
      },
    });
    this.cdr.detectChanges();
  }
  ClientDeblock() {
    this.customerService.updateUserDeBlocked(
      {
        'owner-id':  Number(this.ClientId)
      }
    ).subscribe({
      next: (value) => {
        console.log(value)
        this.isBlocked = false;
        this.toastr.success(
          'Ce client est débloqué.',
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
        this.toastr.error(
          'Ce client est déjà débloqué..',
          'Fidélisation',
          {
            positionClass: 'toast-top-center',
            timeOut: 5000,
            closeButton: true,
            progressBar: true
          }
        );
        // console.log(er);
      },
    });
    this.cdr.detectChanges();
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
