import { Panneau } from './../../openapi/services/models/panneau';
import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { AbonnementResponse, BoulevardResponse, FactureResponse, ImageResponse, LigneAbonnementResponse, Role, User, UserResponse } from '../../openapi/services/models';
import { AbonnementService, BoulevardService, FactureControlerService, ImageService, LigneAbonnmentService, OwnerService } from '../../openapi/services/services';
import { error } from 'console';
import { publicDecrypt } from 'crypto';
import { GetAbonnementById$Params } from '../../openapi/services/fn/abonnement/get-abonnement-by-id';
import { DatePipe } from '@angular/common';
import {MatButtonToggleModule} from '@angular/material/button-toggle';


@Component({
  selector: 'app-abonnement',
  standalone: true,
  imports: [MatButtonToggleModule],
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
    private boulevardService : BoulevardService,
    private imageService: ImageService,

    ){}
  public transactionId : string | null = ""
  public abonnementId : string | null = ""
  public code : string = ""
  public imageUrl: string = '';
  public _image: ImageResponse[] = [];
  isAreadyChecked?: boolean = true; // Cette variable contrôle la sélection
  isValidAbn? : boolean = true
  selectedValue: string ='';
  isModalOpen = false;
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
  private facture : FactureResponse ={
    abonnementId:0,
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

  public lignAbn: LigneAbonnementResponse[] = [];
  private boulResp: Array<BoulevardResponse>= [];
  public abonnement  : AbonnementResponse ={}
  formattedDate: string | null ="";
ngOnInit(): void {

  // console.log("ActivatedRoute snapshot:", this.activatedRoute.snapshot);
  // console.log("Route params:", this.activatedRoute.snapshot.params);

  //  this.transactionId =this.activatedRoute.snapshot.params["transactionId"]
  // this.transactionId = this.activatedRoute.snapshot.queryParamMap.get('transactionId');
  // this.abonnementId = this.activatedRoute.snapshot.queryParamMap.get('abonnement');

  this.activatedRoute.queryParams.subscribe(params => {
    this.abonnementId =  params['abonnement'] ; // Assigne correctement l'ID de l'URL
    this.transactionId = params['transactionId']; // Assigne la transactionId
    console.log('Abonnement dans ngOnInit :', this.abonnement);
    console.log('TransactionId dans ngOnInit :', this.transactionId);

    // Appelle getImage() ici pour s'assurer que abonnement.id est bien défini
    this.getUser();
    this.getFacture();
    this.getAbonnement()
    this.getAllLigneAbn()
    this.getImage();
  });

  // this.getImage()
  // this.setBoulevard()
  console.log("my boulevard responses in init")
  // console.log(this.transactionId)
  // console.log(this.abonnementId)
  console.log(this.boulResp)


}

// public transformDate(dates : string | undefined ){
//   const date = new Date(dates);
//   return this.datePipe.transform(date, 'EEEE le dd MMMM yyyy', 'fr');
// }

  // Fonction pour ouvrir la modale
  openModal(imageUrl: string) {
    this.imageUrl = imageUrl;
    this.isModalOpen = true;
  }

  // Fonction pour fermer la modale
  closeModal() {
    this.isModalOpen = false;
  }

private getUser(){
  const email : string  = this.decoder.getEmail()
  this.userService.getUserByEmail({
    email: email
  }).subscribe({
    next : (data) =>{
      this.user = data
      // console.log(this.user)
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
      // console.log("la facture")
      // console.log(this.facture)
    },
    error:(error)=>{
      console.log(error)
    }
  })

}

public getAllLigneAbn(){
  this.ligneAbnService.getAllLigneAbn1(
    {
      abonnementId : Number(this.abonnementId)
    }
  ).subscribe({
    next: (resp)=>{
      this.lignAbn = resp
      // console.log("this.lignAbn")
      // console.log(this.lignAbn)
      // console.log("this.setBoulevard()")
      // this.setBoulevard()
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

private toNumber(value: string | null): number {
  return value !== null ? Number(value) : 0;
}

public getAbonnement(){
  // this.abnParam['abonnement-id'] = this.toNumber(this.abonnementId)
  // // console.log("dans get")
  // // console.log(this.toNumber(this.abonnementId))
  this.abonnementService.getAbonnementById(
    {
      'abonnement-id' : this.toNumber(this.abonnementId)
    }
  ).subscribe({
    next:(data)=>{
      this.abonnement = data
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
  // console.log("my boulevard responses in methode")
      this.boulResp.push(data);
      // console.log("facture boulevard")
      // console.log(data)
    },
    error: (err) => {
      console.log(err);
    },
  });
}

// public setBoulevard(){
//   // console.log("lign abonn")
//   // console.log(this.lignAbn)
//   // console.log("lign abonn")
//   this.lignAbn.forEach((item,idex)=>{
//     if (item.panneau != undefined) {
//       this.getBoulevard(item.panneau.id)
//     }

//   })
//   console.log("le tableau abonnment")
//   console.log(this.boulResp)
// }
public getImage() {
  this.imageService
    .getImageByAbonnement({
      abonnementId: this.toNumber(this.abonnementId)
    })
    .subscribe({
      next: (data) => {
        this._image = data;
        console.log('this._image[0].picture');
        console.log(this._image[0].picture);
        this.imageUrl = 'data:image/jpg;base64,' + this._image[0].picture;
        console.log('this.imageUrl');
        console.log(this.imageUrl);
      },
      error: (err) => {
        console.log(err);
      },
    });
}

public getInvoice(){
  // console.log(this.lignAbn)
  this.invoiceService.generateInvoice(this.user,this.facture,this.boulResp,this.lignAbn)
}
}
