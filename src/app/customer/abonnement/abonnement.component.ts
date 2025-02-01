import { Panneau } from './../../openapi/services/models/panneau';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { BoulevardResponse, Facture, LigneAbonnementResponse, Role, User, UserResponse } from '../../openapi/services/models';
import { AbonnementService, BoulevardService, FactureControlerService, LigneAbonnmentService, OwnerService } from '../../openapi/services/services';
import { error } from 'console';
import { publicDecrypt } from 'crypto';
import { GetAbonnementById$Params } from '../../openapi/services/fn/abonnement/get-abonnement-by-id';


@Component({
  selector: 'app-abonnement',
  standalone: true,
  imports: [],
  templateUrl: './abonnement.component.html',
  styleUrl: './abonnement.component.css'
})
export class AbonnementComponent implements OnInit {

  constructor(
    private activatedRoute : ActivatedRoute,
    private invoiceService : InvoiceService,
    private decoder : JwtDecodeService,
    private userService : OwnerService,
    private factureService : FactureControlerService,
    private abonnementService: AbonnementService,
    private ligneAbnService: LigneAbonnmentService,
    private boulevardService : BoulevardService

    ){}
  public transactionId : string | null = ""
  public abonnementId : string | null = ""
  public code : string = ""

  private user : UserResponse ={
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
  private facture : Facture ={
    dateAbn: "",
    dateDebAbn: "",
    dateFinAbn: "",
    datePayment: "",
    id: 0,
    mtnPayer: 0,
    mtnRestant: 0,
    mtnTotal: 0,
    reference: "",
    transaction: ""

  }

  private lignAbn: LigneAbonnementResponse[] = [];
  private boulResp: Array<BoulevardResponse>= [];
ngOnInit(): void {

  // console.log("ActivatedRoute snapshot:", this.activatedRoute.snapshot);
  // console.log("Route params:", this.activatedRoute.snapshot.params);

  // this.transactionId =this.activatedRoute.snapshot.params["transactionId"]
  this.transactionId = this.activatedRoute.snapshot.queryParamMap.get('transactionId');
  this.abonnementId = this.activatedRoute.snapshot.queryParamMap.get('abonnement');
  this.getUser();
  this.getFacture();
  this.getAbonnement()
  this.getAllLigneAbn()
  // this.setBoulevard()
  console.log("my boulevard responses in init")
  // console.log(this.transactionId)
  // console.log(this.abonnementId)
  console.log(this.boulResp)

}

private getUser(){
  const email : string  = this.decoder.getEmail()
  this.userService.getUserByEmail({
    email: email
  }).subscribe({
    next : (data) =>{
      this.user = data
      console.log(this.user)
    },
    error: (error)=>{
      console.log(error)
    }
  })
}

public getFacture(){
  this.factureService.getFactureByTrans({
    transId : this.transactionId
  }).subscribe({
    next:(data)=>{
      this.facture =data
      console.log("la facture")
      console.log(this.facture)
    },
    error:(error)=>{
      console.log(error)
    }
  })

}

public getAllLigneAbn(){
  this.ligneAbnService.getAllLigneAbn(
    {
      abonnementId : 2
    }
  ).subscribe({
    next: (resp)=>{
      this.lignAbn = resp
      console.log("this.lignAbn")
      // console.log(this.lignAbn)
      console.log("this.setBoulevard()")
      this.setBoulevard()
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

private toNumber(value: string | null): number {
  return value !== null ? Number(value) : 0;
}

private abnParam : GetAbonnementById$Params ={
  'abonnement-id' : this.toNumber(this.abonnementId)
}


public getAbonnement(){
  this.abnParam['abonnement-id'] = this.toNumber(this.abonnementId)
  console.log("dans get")
  console.log(this.toNumber(this.abonnementId))
  this.abonnementService.getAbonnementById(
    this.abnParam
  ).subscribe({
    next:(data)=>{
      console.log(data)
    },
    error:(error)=>{
      console.log(error)
    }
  })

}

public getBoulevard(id: number | undefined){
  this.boulevardService
  .getBoulByPanneau({
    panneauId: id,
  })
  .subscribe({
    next: (data) => {
  console.log("my boulevard responses in methode")
      this.boulResp.push(data);
      console.log("facture boulevard")
      console.log(data)
    },
    error: (err) => {
      console.log(err);
    },
  });
}

public setBoulevard(){
  // console.log("lign abonn")
  // console.log(this.lignAbn)
  // console.log("lign abonn")
  this.lignAbn.forEach((item,idex)=>{
    this.getBoulevard(item.panneau.id)
  })
  console.log("le tableau abonnment")
  console.log(this.boulResp)
}


public getInvoice(){
  this.invoiceService.generateInvoice(this.user,this.facture,this.boulResp,this.lignAbn)
}
}
