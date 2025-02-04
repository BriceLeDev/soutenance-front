import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatDatepickerModule} from '@angular/material/datepicker'
import { AbonnementRequest, PanneauResponse, TransactionRequest } from '../../openapi/services/models';
import { FormsModule } from '@angular/forms';
import {  AbonnementService, ImageService, TransactionControlerService } from '../../openapi/services/services';
import { SaveImae$Params } from '../../openapi/services/fn/image/save-imae';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import {SweetAlert2Module} from '@sweetalert2/ngx-sweetalert2'
import Swal from 'sweetalert2';
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
    private chandDetect : ChangeDetectorRef

  ){}


  public selectedPanneaux: Set<PanneauResponse> = new Set();
  public selectedPanneauAray: Array<PanneauResponse> = []
  public totalAmount: number = 0;
  public totalPrintPrice : number = 0;
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

  private abonnementRequest: AbonnementRequest ={
    Panneau : [],
    dateAbn : "",
    dateDebut: "string",
    dateFin: "",
    description: "",
    prix: 0
  }

  ngOnInit(): void {
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

  public addPrintPrice(panneau: PanneauResponse, event: any) {
    const prix = panneau.printPrice || 0; // Prix du panneau
    const isChecked = event.target.checked;

    if (isChecked) {
      this.totalAmount += 0;
      this.totalPrintPrice +=prix
      // this.selectedPanneaux.add(panneau);

      // console.log(this.selectedPanneaux);
    } else {
      this.totalAmount -= 0;
      this.totalPrintPrice -=prix
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
  this.finalAbnAmount.set(this.totalAmount*Math.ceil(this.calculateAbnAmount(this.startDate,this.endDate)))

  //talk to angular to update my sweetalert pupop after the update of finalAbnAmount
  this.chandDetect.detectChanges()

}

public saveAbonnement(){
  console.log("doing abonnement")
  console.log("date debut : " + this.formatDate(this.startDate))
  console.log("date fin : " + this.formatDate(this.startDate))
  console.log("price : "  + this.finalAbnAmount())
  this.abonnementRequest.Panneau = this.selectedPanneauAray.flatMap(pan => pan.id != undefined ? [pan.id]:[])
  this.abonnementRequest.dateDebut = this.formatDate(this.startDate);
  this.abonnementRequest.dateFin = this.formatDate(this.endDate);
  this.abonnementRequest.dateAbn = this.formatDate(new Date());
  this.abonnementRequest.prix = this.finalAbnAmount() + this.totalPrintPrice
  this.abonnementRequest.description =this.description
  this.addAbonnement();

}

private addAbonnement(){
  console.log("dand do abn")
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
 formData = new FormData()
private addImage(id:number){
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
  this.transactionRequest.amount = this.finalAbnAmount()
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
