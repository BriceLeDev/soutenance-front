import { Component, OnInit } from '@angular/core';
import {
  AbonnementResponse,
  BoulevardResponse,
  Facture,
  ImageResponse,
  LigneAbonnementResponse,
  UserResponse,
} from '../../openapi/services/models';
import {
  AbonnementService,
  BoulevardService,
  FactureControlerService,
  ImageService,
  LigneAbonnmentService,
  OwnerService,
} from '../../openapi/services/services';
import { GetAbonnementById$Params } from '../../openapi/services/fn/abonnement/get-abonnement-by-id';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
@Component({
  selector: 'app-show-more-abonnement',
  standalone: true,
  imports: [],
  templateUrl: './show-more-abonnement.component.html',
  styleUrl: './show-more-abonnement.component.css',
})
export class ShowMoreAbonnementComponent implements OnInit {
  constructor(
    private imageService: ImageService,
    private abnService: AbonnementService,
    private ligneAbnService: LigneAbonnmentService,
    private activatedRoute: ActivatedRoute,
    private factureService: FactureControlerService,
    private invoiceService: InvoiceService,
    private decoder: JwtDecodeService,
    private userService: OwnerService,
    private boulevardService : BoulevardService,

  ) {}
  public _image: ImageResponse[] = [];
  public idAbn: number = 0;
  public abonnement: AbonnementResponse = {};
  public lignAbn: LigneAbonnementResponse[] = [];
  public transactionId: string | null = '';
  public abonnementId: string | null = '';
  private boulResp: Array<BoulevardResponse>= [];

  private facture: Facture = {
    dateAbn: '',
    dateDebAbn: '',
    dateFinAbn: '',
    datePayment: '',
    id: 0,
    mtnPayer: 0,
    mtnRestant: 0,
    mtnTotal: 0,
    reference: '',
    transaction: '',
  };

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

  ngOnInit(): void {
    this.transactionId =
      this.activatedRoute.snapshot.queryParamMap.get('transactionId');
    this.abonnementId = this.activatedRoute.snapshot.params['abonnement'];
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

  public getFacture() {
    this.factureService
      .getFactureByTrans({
        transId: this.transactionId,
      })
      .subscribe({
        next: (data) => {
          this.facture = data;
          console.log('la facture');
          console.log(this.facture);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public getImage() {
    this.imageService
      .findAllImages({
        abonnementId: this.idAbn,
      })
      .subscribe({
        next: (data) => {
          this._image = data;
          // console.log('this._image[0].picture');
          // console.log(this._image[0].picture);
          // this.imageUrl = 'data:image/jpg;base64,' + this._image[0].picture;
          // console.log('this.imageUrl');
          // console.log(this.imageUrl);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAbonnementById() {
    const abnParam: GetAbonnementById$Params = {
      'abonnement-id': this.idAbn,
    };
    this.abnService.getAbonnementById(abnParam).subscribe({
      next: (data) => {
        this.abonnement = data;
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public getAllLigneAbn() {
    this.ligneAbnService
      .getAllLigneAbn({
        abonnementId: Number(this.abonnementId),
      })
      .subscribe({
        next: (resp) => {
          this.lignAbn = resp;
          console.log('this.lignAbn');
          console.log(this.lignAbn);
          console.log('this.setBoulevard()');
          // this.setBoulevard()
        },
        error: (err) => {
          console.log(err);
        },
      });
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
  public getInvoice() {
    // console.log(this.lignAbn)
    this.invoiceService.generateInvoice(
      this.user,
      this.facture,
      this.boulResp,
      this.lignAbn
    );
  }
}
