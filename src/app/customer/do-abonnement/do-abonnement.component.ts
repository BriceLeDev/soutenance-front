import { Boulevard } from './../../openapi/services/models/boulevard';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import { BoulevardResponse, PageResponseBoulevardResponse, PageResponsePanneauResponse, PanneauResponse } from '../../openapi/services/models';
import { BoulevardService, PanneauService } from '../../openapi/services/services';
import { GetAllPanneauxLibreByBoulevard$Params } from '../../openapi/services/fn/panneau/get-all-panneaux-libre-by-boulevard';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-do-abonnement',
  standalone: true,
  imports: [],
  templateUrl: './do-abonnement.component.html',
  styleUrl: './do-abonnement.component.css'
})
export class DoAbonnementComponent implements OnInit{
  public boulevardService = inject(BoulevardService);
  public PanneauService = inject(PanneauService);
  constructor(private toastr: ToastrService){}
  public router = inject(Router);
  public changeDetect = inject(ChangeDetectorRef);
  public boulevards : PageResponseBoulevardResponse ={}
  public panneaux : PageResponsePanneauResponse ={}
  public parms : GetAllPanneauxLibreByBoulevard$Params ={
    boulevard: "",
    page: 0,
    size: 10
  }
  showComponent: boolean = true;

  public isCheck = false
  public totalAmount: number = 0;
  public selectedPanneaux: Set<PanneauResponse> = new Set();
  public selectedPanneauAray: Array<PanneauResponse> = []
  ngOnInit(): void {
      localStorage.removeItem('paymentUrl');
      this.updateLocalStorage()
      this.getAllBoulevard()

    }


    public updateLocalStorage(){
      const savedPanneaux = localStorage.getItem('selectedPanneaux');
      const savedAmount = localStorage.getItem('totalAmount');

      if (savedPanneaux) {
        // this.selectedPanneaux.push(...JSON.parse(savedPanneaux));
        this.selectedPanneaux = new Set(JSON.parse(savedPanneaux));
        // this.selectedPanneauAray) = new Set(JSON.parse(savedPanneaux));
        this.selectedPanneauAray = Array.from(this.selectedPanneaux)
      }
      if (savedAmount) {
        this.totalAmount = parseFloat(savedAmount);
      }
    }



    private getAllBoulevard(){
      this.boulevardService
        .boulevardFindAll({
          page: 0,
          size: 10,
        })
        .subscribe({
          next: (resp) => {
            this.boulevards = resp;
          },
          error: (err) => {
            console.log(err)
          },
        });

    }


    public getpanneauLibreByBoulevard(BoulevardId:any){
      this.updateLocalStorage()
        this.parms.boulevard = BoulevardId
        this.PanneauService
          .getAllPanneauxLibreByBoulevard(
              this.parms
          ).subscribe({
            next:(response)=>{
              this.panneaux = response
              if (this.panneaux.content?.length ==0) {
                this.toastr.info(
                  'Aucun panneau disponible sur ce boulevard.',
                  'Info',
                  {
                    positionClass: 'toast-top-center',
                    timeOut: 5000,
                    closeButton: true,
                    progressBar: true

                  }
                );
                return
              }
              // console.log('Panneaux sélectionnés:', Array.from(this.selectedPanneauAray));
              // console.log('Panneau dans la réponse:', response.content);
            },
            error:(error)=>{
              console.log(error)
            }
          })
    }

    // public addPrice(panneau: PanneauResponse, event: any) {
    //   const prix = panneau.prixMensuel || 0;
    //   const isChecked = event.target.checked;
    //   console.log(isChecked)
    //   if (isChecked) {
    //     console.log(isChecked)
    //     this.totalAmount += prix;
    //     this.selectedPanneaux.add(panneau);
    //      console.log(this.selectedPanneaux)
    //     // Sauvegarder la sélection dans le localStorage
    //     localStorage.setItem('selectedPanneaux', JSON.stringify(Array.from(this.selectedPanneaux)));
    //     localStorage.setItem('totalAmount', this.totalAmount.toString());
    //   } else {
    //     console.log(isChecked)
    //     this.totalAmount -= prix;
    //     this.selectedPanneaux.delete(panneau);
    //     console.log(this.selectedPanneaux)
    //     // Mettre à jour le localStorage
    //     localStorage.setItem('selectedPanneaux', JSON.stringify(Array.from(this.selectedPanneaux)));
    //     localStorage.setItem('totalAmount', this.totalAmount.toString());
    //   }
    // }

    public haveVideoPan() : boolean{
      return [...this.selectedPanneaux].some((selectPan) => selectPan.typePanneauLibele === "Numérique-vidéo");
    }


    public addPrice(panneau: PanneauResponse, event: any) {

      this.haveVideoPan()
      console.log(this.haveVideoPan())
      const prix = panneau.prixMensuel || 0;
      const isChecked = event.target.checked;

      if (isChecked) {
        if (this.haveVideoPan() && this.selectedPanneaux.size > 1) {
          console.log(this.haveVideoPan())
          console.log("this.haveVideoPan() in if")

          this.toastr.error(
            "Veuillez faire l'abonnement au panneaux de type vidéo séparés des autres types.",
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
          console.log("this.haveVideoPan() in else")
          console.log(this.haveVideoPan())
        // Vérifier si un panneau avec le même ID est déjà dans le Set
        if (![...this.selectedPanneaux].some(p => p.id === panneau.id)) {
          this.totalAmount += prix;
          this.selectedPanneaux.add(panneau);
        }
      } else {
       
          console.log("this.haveVideoPan() in else")
          console.log(this.haveVideoPan())
        // Supprimer le panneau du Set s'il est présent
        this.selectedPanneaux = new Set([...this.selectedPanneaux].filter(p => p.id !== panneau.id));
        this.totalAmount -= prix;
      }

      // Sauvegarder la sélection dans le localStorage
      localStorage.setItem('selectedPanneaux', JSON.stringify([...this.selectedPanneaux]));
      localStorage.setItem('totalAmount', this.totalAmount.toString());

      console.log(this.selectedPanneaux);

    }



    // public addPrintPrice(panneau: PanneauResponse, event: any) {
    //    const prix = panneau.printPrice || 0; // Prix du panneau
    //   const isChecked = event.target.checked;

    //   // if (isChecked) {
    //   //   this.totalAmount += prix;
    //   //    this.selectedPanneaux.push(panneau);

    //   //   // console.log(this.selectedPanneaux);
    //   // } else {
    //   //   this.totalAmount -= prix;
    //   //   this.selectedPanneaux = this.selectedPanneaux.filter(p => p.id !== panneau.id);
    //   //   // console.log("selectedPanneaux");
    //   //   // console.log(this.selectedPanneaux);
    //   // }
    // }
    public getDetail(){
      if (this.totalAmount == 0) {
        this.toastr.error(
          'Veuillez choisir au moins un panneau publicitaire.',
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
      if (this.haveVideoPan() && this.selectedPanneaux.size > 1) {
        this.toastr.error(
          "Veuillez faire l'abonnement au panneaux de type vidéo séparés des autres types.",
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
      // alert("detail")
      this.router.navigate(["customer/abonnement-detail"])
      // console.log(this.selectedPanneaux);
    }
    refreshComponent(): void {
      this.ngOnInit();
    }

    reloadComponent(): void {
      this.showComponent = false;
      setTimeout(() => this.showComponent = true,500);
    }

    public cancel(){
      this.router.navigateByUrl("customer/do-abonnement")
      this.selectedPanneaux = new Set();
      this.totalAmount = 0;
     localStorage.removeItem('selectedPanneaux');
     localStorage.removeItem('paymentUrl');
     localStorage.removeItem('totalAmount');
     this.selectedPanneauAray=[]
     this.reloadComponent()
    }

    //verifie si le panneau est sélectionné ou pas
    public isPanneauSelected(panneauId: number| undefined): boolean {
      return this.selectedPanneauAray.some(p => p.id === panneauId);
  }

  }



