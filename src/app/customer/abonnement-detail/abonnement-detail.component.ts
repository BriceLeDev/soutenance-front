import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { AbonnementRequest, PanneauResponse, TransactionRequest, UserResponse } from '../../openapi/services/models';
import { FormsModule } from '@angular/forms';
import {  AbonnementService, ImageService, OwnerService, TransactionControlerService } from '../../openapi/services/services';
import { SaveImae$Params } from '../../openapi/services/fn/image/save-imae';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
@Component({
  selector: 'app-abonnement-detail',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule, FormsModule,SweetAlert2Module],
  templateUrl: './abonnement-detail.component.html',
  styleUrl: './abonnement-detail.component.css'
})
export class AbonnementDetailComponent implements OnInit {

  constructor(
    private abonnementService : AbonnementService,
    private imageService : ImageService,
    private transactionService : TransactionControlerService,
    private sharedService : SharedServiceService,
    private router : Router,
    private chandDetect : ChangeDetectorRef,
    private toastr: ToastrService,
    private userService: OwnerService,
    private decoder: JwtDecodeService,
    private cdr: ChangeDetectorRef

  ){}


  public selectedPanneaux: Set<PanneauResponse> = new Set();
  public selectedPanneauAray: Array<PanneauResponse> = []
  public totalAmount: number = 0;
  public totalPrintPrice  = signal(0);
  public open:boolean = false;
  public imageSelected : any | undefined
  public pictureSelectedforAbnt : any | undefined
  public imageUrl: any = ""; // Stocke l'URL de l'image ou vidéo
  public videoUrl: any = ""; // Stocke l'URL de l'image ou vidéo
  public format: string  = ""; // Stocke le format du fichier sélectionné
  public haveVideo : boolean = false;
  public startDate: Date | null = null;
  public endDate: Date | null = null;
  public description : string = "";
  public fileBobl: any ;
  private transactionRequest : TransactionRequest={}
  public paymentLink : string | undefined = ""
  public finalAbnAmount= signal(0)
  public isFidel : boolean = false
  public formData = new FormData()
  private abonnementRequest: AbonnementRequest ={
    Panneau : [],
    dateAbn : "",
    dateDebut: "string",
    dateFin: "",
    description: "",
    prix: 0
  }

  public user: UserResponse = {
    accountLocked: false,
    createdAT: '',
    email: '',
    enabled: true,
    fidelisation: false,
    id: 0,
    nonUtilisateur: '',
    numero: '',
    roleList: [],
    updateAt: '',
  };



  ngOnInit(): void {
    console.log("dans le init")
    this.getUser()
    console.log("dans le init")
    const savedPanneaux = localStorage.getItem('selectedPanneaux');
    const savedAmount = localStorage.getItem('totalAmount');

    if (savedPanneaux) {
      this.selectedPanneaux = new Set(JSON.parse(savedPanneaux));
      this.selectedPanneauAray = Array.from(this.selectedPanneaux)
    }
    if (savedAmount) {
      this.totalAmount = parseFloat(savedAmount);
      this.totalAmount = this.totalAmount*this.calculateAbnAmount(this.startDate,this.endDate);
    }


  }

  private getUser() {
    const email: string = this.decoder.getEmail();
    this.userService
      .getUserByEmail({
        email: email,
      })
      .subscribe({
        next: (data) => {
          this.user = data;
           console.log("this.user.fidelisation");
           console.log(this.user.fidelisation);
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.cdr.detectChanges();
  }

  public addPrintPrice(panneau: PanneauResponse, event: any) {
    const prix = panneau.printPrice || 0; // Prix du panneau
    const isChecked = event.target.checked;

    if (isChecked) {
      this.totalAmount += 0;
      this.totalPrintPrice.set(this.totalPrintPrice() +prix)
      // this.selectedPanneaux.add(panneau);

      // console.log(this.selectedPanneaux);
    } else {
      this.totalAmount -= 0;
      this.totalPrintPrice.set(this.totalPrintPrice()-prix)
      // this.selectedPanneaux.delete(panneau);
      // console.log("selectedPanneaux");
      // console.log(this.selectedPanneaux);
    }
  }

  public openModal() {
    this.open = !this.open;
}

public fileSelected(event: any){
  this.imageSelected = event.target.files[0]
  // console.log(this.imageSelected)

  if (this.imageSelected) {
    const reader:FileReader = new FileReader()

    reader.onload =()=>{
      this.pictureSelectedforAbnt  = reader.result as string
    }
    reader.readAsDataURL(this.imageSelected)
    // console.log(this.imageSelected)
  }
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
        this.imageUrl = (<FileReader>event.target).result;
      }
    } else if(file.type.indexOf('video')> -1){
      this.format = 'video';
      reader.onload = (event) => {
        this.videoUrl = (<FileReader>event.target).result;
      }
    }

  }
}

// Recupérer la vidéo
onSelectFileVideo(event:any) {
  const file = event.target.files && event.target.files[0];
  this.fileBobl = event.target.files && event.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    if(file.type.indexOf('image')> -1){
      this.format = 'image';
      reader.onload = (event) => {
        this.imageUrl = (<FileReader>event.target).result;
      }
    } else if(file.type.indexOf('video')> -1){
      this.format = 'video';
      reader.onload = (event) => {
        this.videoUrl = (<FileReader>event.target).result;
      }
    }

  }
}

//Vérifie si la liste des panneau contient un panneau Numérique-vidéo
public haveVideoPan() : boolean{
   return this.selectedPanneauAray.some((selectPan)=>selectPan.typePanneauLibele=="Numérique-vidéo")
}
//Vérifie si la liste des panneau contient un panneau Numérique-image
public haveImagePan() : boolean{
   return this.selectedPanneauAray.some((selectPan)=>selectPan.typePanneauLibele=="Numérique-image")
}


//FORMATAGE DES DATES
formatDate(date: Date | null): string {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  return "";
}

public dateClicked(){
  if (this.startDate === null) {
    alert(" Veuillez Choisir d'abord la date début!")

  }
}

//CALCULE DE LA DUREE EN MOIS
public calculateAbnAmount(startDate : Date| null , endDate : Date | null): number{

    if (!startDate || !endDate) {
      throw new Error("Les deux dates doivent être définies.");
    }

  const diffInMs = endDate.getTime() - startDate.getTime(); // Différence en millisecondes
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24); // Conversion en jours

  // Convertir les jours en mois  (1 mois ≈ 30 jours)
  const diffInMonths = diffInDays / 30;

  return diffInMonths;


}

public showAmount() : number{
  return this.totalAmount*Math.ceil(this.calculateAbnAmount(this.startDate,this.endDate))
}

public clickOnAbnbtn(){
  if (this.startDate == null || this.endDate == null) {
    this.toastr.error(
      'Veuillez définir les dates début et fin.',
      'Conflit',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return
  }

  if (this.startDate > this.endDate) {
    this.toastr.error(
      'La date de début ne peut pas être supérieure à la date de fin.',
      'Conflit',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }
  if (this.isFidel) {
  this.finalAbnAmount.set((this.totalAmount*Math.ceil(this.calculateAbnAmount(this.startDate,this.endDate)))/2)
  this.chandDetect.detectChanges()
  return
  }
  this.finalAbnAmount.set(this.totalAmount*Math.ceil(this.calculateAbnAmount(this.startDate,this.endDate)))
  //talk to angular to update my sweetalert pupop after the update of finalAbnAmount
  this.chandDetect.detectChanges()

}

public saveAbonnement(){

  // console.log("doing abonnement")
  // console.log("date debut : " + this.formatDate(this.startDate))
  // console.log("date fin : " + this.formatDate(this.startDate))
  // console.log("price : "  + this.finalAbnAmount())
  if (this.startDate == null || this.endDate == null) {
    this.toastr.error(
      'Veuillez définir la date de début et la date de fin de votre abonnement.',
      'Conflit',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Réinitialiser l'heure pour comparer uniquement les dates

  const oneWeekLater = new Date(today);
  oneWeekLater.setDate(oneWeekLater.getDate() + 7); // Ajouter 7 jours

  if (this.startDate < today) {
    this.toastr.error(
      'La date de début ne peut pas être antérieure à la date du jour.',
      'Erreur de date',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }

  if (this.endDate < today) {
    this.toastr.error(
      'La date de fin ne peut pas être antérieure à la date du jour.',
      'Erreur de date',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }

  // Vérifier si les dates sont au moins une semaine après aujourd'hui
  if (this.startDate < oneWeekLater) {
    this.toastr.error(
      'La date de début doit être au moins une semaine après la date du jour.',
      'Date invalide',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }

  if (this.endDate < oneWeekLater) {
    this.toastr.error(
      'La date de fin doit être au moins une semaine après la date du jour.',
      'Date invalide',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }

  if (this.startDate > this.endDate) {
    this.toastr.error(
      'La date de début ne peut pas être supérieure à la date de fin.',
      'Conflit',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }
if(this.haveImagePan() == true){
  if (!this.fileBobl || this.fileBobl === '') {
    this.toastr.error(
      'Veuillez définir l\'image de l\'abonnement.',
      'Conflit',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }
}



  this.abonnementRequest.Panneau = this.selectedPanneauAray.flatMap(pan => pan.id != undefined ? [pan.id]:[])
  this.abonnementRequest.dateDebut = this.formatDate(this.startDate);
  this.abonnementRequest.dateFin = this.formatDate(this.endDate);
  this.abonnementRequest.dateAbn = this.formatDate(new Date());
  if(this.isFidel){
    this.abonnementRequest.prix = (this.finalAbnAmount() + this.totalPrintPrice())*2
  }else{
    this.abonnementRequest.prix = this.finalAbnAmount() + this.totalPrintPrice()
  }

  this.abonnementRequest.description =this.description
  this.addAbonnement();

}

public recalculate(){
  this.isFidel = true
}

private addAbonnement(){
  // console.log("dand do abn")
  if (this.abonnementRequest.description ==="") {
    this.toastr.error(
      'Veuillez donner une description ou autres informations sur votre abonnement.',
      'Conflit',
      {
        positionClass: 'toast-top-center',
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      }
    );
    return;
  }
  this.abonnementService.doAbonnement({
    body:this.abonnementRequest
  }).subscribe({
    next:(resp)=>{
        // console.log(resp)
        this.addImage(resp)
        this.addPayement(resp)
        this.router.navigateByUrl('/customer/payment')
    },
    error:(err)=>{
      alert(err)
      console.log(err)
    }
  })
}


private addImage(id:number){
  // if (!this.fileBobl || this.fileBobl === '') {
  //   this.toastr.error(
  //     'Veuillez choisir une image ou décoché la case imprimé',
  //     'Conflit',
  //     {
  //       positionClass: 'toast-top-center',
  //       timeOut: 5000,
  //       closeButton: true,
  //       progressBar: true
  //     }
  //   );
  //   return;
  // }
  this.formData.append("abonnement-id", id.toString())
  this.formData.append("file", this.fileBobl ? this.fileBobl:"")

    const requestBody: SaveImae$Params = {
      'abonnement-id': id,
      body: {
        'file': this.fileBobl // ici, `this.file` est de type File ou Blob
      }
    };

  this.imageService.saveImae(
    requestBody
  ).subscribe({
    next:(resp)=>{
     console.log(resp)
    },
    error:(err)=>{
      console.log(err)
    }
  })
}

private addPayement(idAbn:number){

  this.transactionRequest.abonnementId = idAbn
  this.transactionRequest.amount = this.finalAbnAmount() + this.totalPrintPrice()
  this.transactionRequest.chanel="ALL"
  this.transactionRequest.currency="XOF"
  this.transactionRequest.dateTrans =this.formatDate(new Date)
  this.transactionRequest.description = "Payement de l'abonnement"

  console.log(this.transactionRequest)
  this.transactionService.getPaymentLink({
    request : this.transactionRequest
  }).subscribe({
    next:(resp)=>{
      this.sharedService.paymentLink = resp.data?.payment_url

      if (resp.data?.payment_url) {
      localStorage.setItem('paymentUrl', resp.data.payment_url);

      }
       console.info(resp)
       console.info(resp.data?.payment_url)
       console.info(resp.api_response_id)
    },
    error:(err)=>{
      console.error(err.error)
    }
  })
}



}
