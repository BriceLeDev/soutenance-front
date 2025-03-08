import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import {
  Abonnement,
  AbonnementResponse,
  BoulevardResponse,
  FactureResponse,
  ImageResponse,
  LigneAbonnementResponse,
  TransactionResponse,
  UserResponse,
} from '../../openapi/services/models';
import {
  AbonnementService,
  BoulevardService,
  FactureControlerService,
  ImageService,
  LigneAbonnmentService,
  OwnerService,
  TransactionControlerService,
} from '../../openapi/services/services';
import { GetAbonnementById$Params } from '../../openapi/services/fn/abonnement/get-abonnement-by-id';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { InvoiceService } from '../../customer/services/invoice.service';
import {ChangeDetectionStrategy} from '@angular/core';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admin-abn-detail',
  standalone: true,
  imports: [MatButtonToggleModule],
  templateUrl: './admin-abn-detail.component.html',
  styleUrl: './admin-abn-detail.component.css'
})
export class AdminAbnDetailComponent implements OnInit {


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
    private transactionService : TransactionControlerService,
     private toastr: ToastrService,
     private cdr: ChangeDetectorRef

  ) {}
  public _image: ImageResponse[] = [];
  public idAbn: number = 0;
  public abonnement: AbonnementResponse = {};
  public transaction: TransactionResponse = {};
  public lignAbn: LigneAbonnementResponse[] = [];
  public transactionId: string | null = '';
  public abonnementId: string | null = '';
  public userId: string | null = '';
  private boulResp: Array<BoulevardResponse>= [];
  public imageUrl: string = '';
  private facture: FactureResponse = {
    abonnementId: 0,
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

  isAreadyChecked?: boolean = true; // Cette variable contrôle la sélection
  isValidAbn? : boolean = true
  selectedValue: string ='';
  isModalOpen = false;
  ngOnInit(): void {


    this.activatedRoute.params.subscribe(params => {
      this.abonnementId = params['abonnementId'];
      this.userId = params['userId'];
      if (this.abonnementId && this.userId) {
        console.log("initialisation");
        this.getAbonnementById();
        this.getAllLigneAbn();
        this.getImage()
      }
    });
  }

  ngOnChanges() {
    this.checkValidation();  // Met à jour automatiquement en cas de changement
  }

  public checkValidation(){

    console.log("this.isAreadyChecked")
    console.log(this.isAreadyChecked)
    console.log("this.isValidAbn")
    console.log(this.isValidAbn)

    if (this.isAreadyChecked === false) {
      this.selectedValue = "attente"
    }else  {
      if (this.isValidAbn === true) {
        this.selectedValue = "valid"
      }else{
        this.selectedValue = "invalid"
      }

    }
  }

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

  // public getAllTransactions(){

  //   this.transactionService.getAllTransaction()
  //   .subscribe({
  //     next : (data)=>{
  //       this.transaction = data
  //     },
  //     error : (err)=>{

  //       console.log(err)
  //     }

  //   })

  // }

  public getFacture() {
    this.factureService
      .getFactureByTrans({
        transId: this.transactionId,
      })
      .subscribe({
        next: (data) => {
          this.facture = data;
          // console.log('la facture');
          // console.log(this.facture);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  // public getImage() {
  //   this.imageService
  //     .findAllImages({
  //       abonnementId: Number(this.abonnementId),
  //     })
  //     .subscribe({
  //       next: (data) => {
  //         this._image = data;
  //         // console.log('this._image[0].picture');
  //         // console.log(this._image[0].picture);
  //         // this.imageUrl = 'data:image/jpg;base64,' + this._image[0].picture;
  //         // console.log('this.imageUrl');
  //         // console.log(this.imageUrl);
  //       },
  //       error: (err) => {
  //         console.log(err);
  //       },
  //     });
  // }
  public getImage() {
    this.imageService
      .getImageByAbonnement({
        abonnementId:  Number(this.abonnementId),
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

  getAbonnementById() {
    const abnParam: GetAbonnementById$Params = {
      'abonnement-id': Number(this.abonnementId),
    };
    this.abnService.getAbonnementById(abnParam).subscribe({
      next: (data) => {
        this.abonnement = data;
        this.isAreadyChecked = this.abonnement.alreadyCheck
        this.isValidAbn = this.abonnement.valid
        this.checkValidation();
        console.log(data);
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.cdr.detectChanges();
  }

  public getAllLigneAbn() {
    this.ligneAbnService
      .getAllLigneAbn1({
        abonnementId: Number(this.abonnementId),
      })
      .subscribe({
        next: (resp) => {
          this.lignAbn = resp;
          // console.log('this.lignAbn');
          // console.log(this.lignAbn);
          // console.log('this.setBoulevard()');
          // this.setBoulevard()
        },
        error: (err) => {
          console.log(err);
        },
      });
      this.cdr.detectChanges();
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
        // console.log("facture boulevard")
        // console.log(data)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  public ValidAbn() {
    this.abnService.validate({
      abonnementId:  Number(this.abonnementId),
    }).subscribe({
      next : rep =>{
        this.toastr.success('Abonnement validé avec succès !!', 'Succès');
      },
      error : err =>{
        console.log(err);
      }
    })
  }
  public InvalidAbn() {
    this.abnService.invalidate({
      abonnementId:  Number(this.abonnementId),
    }).subscribe({
      next : rep =>{
        this.toastr.success('Abonnement invalidé avec succès !!', 'Succès');
      },
      error : err =>{
        console.log(err);
      }
    })
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
