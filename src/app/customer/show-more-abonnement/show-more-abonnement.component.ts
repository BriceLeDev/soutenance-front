import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {
  AbonnementResponse,
  BoulevardResponse,
  FactureResponse,
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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
@Component({
  selector: 'app-show-more-abonnement',
  standalone: true,
  imports: [MatButtonToggleModule,MatButtonModule, MatDividerModule, MatIconModule],
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
      private cdr: ChangeDetectorRef

  ) {}
  public _image: ImageResponse[] = [];
  public imageUrl: string = '';
  public idAbn: number = 0;
  public abonnement: AbonnementResponse = {};
  public lignAbn: LigneAbonnementResponse[] = [];
  public transactionId: string | null = '';
  public abonnementId: string | null = '';
  private boulResp: Array<BoulevardResponse>= [];
  public format: string  = "";
  public fileBobl: any ;
  public _imageUrl: any = "";
  public videoUrl: any = '';


  private facture: FactureResponse = {
    abonnementId:0,
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
      this.abonnementId = params['id'];// Assigne correctement l'ID de l'URL
      console.log('Abonnement dans ngOnInit :', this.abonnementId);
      console.log('TransactionId dans ngOnInit :', this.transactionId);

      // Appelle getImage() ici pour s'assurer que abonnement.id est bien défini
      if(this.abonnementId){

        this.getFacture();
        this.getAbonnementById()
        this.getAllLigneAbn()
        this.getImage();
      }
      this.getUser();
    });
  }
  ngOnChanges() {
    this.checkValidation();  // Met à jour automatiquement en cas de changement
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
      .getFactureByAbonnementid({
        abonnementId: Number(this.abonnementId)
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

  onSelectFile(event:any) {
    const file = event.target.files && event.target.files[0];
    this.fileBobl = event.target.files && event.target.files[0];
    if (file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      if(file.type.indexOf('image')> -1){
        this.format = 'image';
        reader.onload = (event) => {
          this._imageUrl = (<FileReader>event.target).result;
        }
      } else if(file.type.indexOf('video')> -1){
        this.format = 'video';
        reader.onload = (event) => {
          this.videoUrl = (<FileReader>event.target).result;
        }
      }

    }
  }

  public getImage() {
    this.imageService
      .getImageByAbonnement({
        abonnementId: Number(this.abonnementId)
      })
      .subscribe({
        next: (data) => {
          this._image = data;
          // console.log('this._image[0].picture');
          // console.log(this._image[0].picture);
           this.imageUrl = 'data:image/jpg;base64,' + this._image[0].picture;
          // console.log('this.imageUrl');
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAbonnementById() {
    const abnParam: GetAbonnementById$Params = {
      'abonnement-id': Number(this.abonnementId)
    };
    this.abnService.getAbonnementById(abnParam).subscribe({
      next: (data) => {
        this.abonnement = data;
        this.isAreadyChecked = this.abonnement.alreadyCheck
        this.isValidAbn = this.abonnement.valid
        // console.log(data);
        this.checkValidation()
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
          console.log('this.lignAbn');
          console.log(this.lignAbn);
          console.log('this.setBoulevard()');
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
