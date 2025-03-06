import { Component, OnInit, inject } from '@angular/core';
// import { BoulevardService } from './../../openapi/services$/services/boulevard.service';
import {
  BoulevarRequest,
  BoulevardResponse,
  PageResponseBoulevardResponse,
} from '../../openapi/services/models';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedServiceService } from '../admin-services/shared-service.service';
import {
  BoulevardService,
  PanneauService,
} from '../../openapi/services/services';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Boulevard } from '../../model/Boulevard';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-boulevard',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './boulevard.component.html',
  styleUrl: './boulevard.component.css',
})
export class BoulevardComponent implements OnInit {
  public open: boolean = false;
  public myerrore: Array<String> = [];
  public openModal() {
    this.open = !this.open;
  }

  public boulevardresponse: PageResponseBoulevardResponse = {};
  public boulevardsFilter?: Array<BoulevardResponse> = [];
  public boulevards?: Array<BoulevardResponse> = [];
  public filterItem: string = '';
  public boulevarRequest: BoulevarRequest = {
    name: '',
  };
  constructor(
    private boulevardService: BoulevardService,
    private panneauService: PanneauService,
    private route: Router,
    private toastr: ToastrService
  ) {}
  public boulevardsState = inject(SharedServiceService);

  public startDate: Date | null = null;
  public endDate: Date | null = null;

  ngOnInit(): void {
    this.getAllBoulevard();
  }

  public dateClicked() {
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!");
    }
  }
  // public addBoulevard() {
  //   this.myerrore = [];
  //   this.boulevardService
  //     .saveBoulevard({
  //       body: this.boulevarRequest,
  //     })
  //     .subscribe({
  //       next: (resp) => {
  //         this.getAllBoulevard();
  //         this.toastr.success('Boulevard ajouté avec succès !!', 'Succès');
  //         this.open = false;
  //       },
  //       error: (err) => {

  //         if (err.error.validationError) {
  //           this.myerrore = err.error.validationError;
  //           console.log('Mon erreurs :', err);
  //         }
  //       },
  //     });
  // }
  public addBoulevard() {
    this.myerrore = [];
    this.boulevardService
      .saveBoulevard({
        body: this.boulevarRequest,
      })
      .subscribe({
        next: (resp) => {
          this.getAllBoulevard();
          this.toastr.success('Boulevard ajouté avec succès !!', 'Succès');
          this.open = false;
        },
        error: (err) => {
          console.log('Erreur reçue :', err);

          if (err.status === 409) {
            this.toastr.error(
              'Ce boulevard existe déjà. Veuillez vérifier les données.',
              'Conflit',
              {
                positionClass: 'toast-top-center',
                timeOut: 5000,
                closeButton: true,
                progressBar: true
              }
            );
          } else if (err.error.validationError) {
            this.myerrore = err.error.validationError;
            this.toastr.error(
              'Une erreur de validation est survenue.',
              'Erreur de validation',
              {
                positionClass: 'toast-top-center',
                timeOut: 5000,
                closeButton: true,
                progressBar: true
              }
            );
          } else {
            this.toastr.error(
              'Une erreur inattendue est survenue.',
              'Erreur',
              {
                positionClass: 'toast-top-center',
                timeOut: 5000,
                closeButton: true,
                progressBar: true
              }
            );
          }
        },
      });
  }


  public getAllBoulevard() {
    this.boulevardService
      .boulevardFindAll({
        page: 0,
        size: 10,
      })
      .subscribe({
        next: (resp) => {
          this.boulevardresponse = resp;
          this.boulevardsState.boulevardresponse = resp;
          if (resp.content != undefined) {
            this.boulevards = resp.content;
            this.boulevardsFilter = [...(this.boulevards || [])];
          }
          console.log(resp);
        },
        error: (err) => {},
      });
  }

  public getPanneauByBoulevard(boulId: string | undefined) {
    if (boulId != undefined)
      this.panneauService
        .getAllPanneauxByBoulevard({
          boulevard: boulId,
          page: 1,
          size: 10,
        })
        .subscribe({
          next: (resp) => {
            console.log(resp);
          },
          error: (err) => {
            console.log(err);
          },
        });
  }

  formatDate(date: Date | null): string {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return '';
  }

  public reserachBetween2Date() {}

  public onClickItem(boulevar : BoulevardResponse) {
    this.route.navigate(['/admin/boulevard/detail', boulevar.id]);
    this.getPanneauByBoulevard(boulevar.name);
  }

  public getByFilterItems() {

    if (!this.filterItem?.trim()) {
      // Si le champ est vide, on affiche tous les boulevards
      console.warn('Valeur de filterItem: dans if', this.boulevardsFilter);
      this.boulevardsFilter = [...(this.boulevards || [])];
      return;
    }

    this.boulevardsFilter =
      this.boulevards?.filter((p) =>
        p.name?.toLowerCase().includes(this.filterItem.toLowerCase())
      ) || [];
    console.warn('Valeur de filterItem: dans else', this.boulevardsFilter);
  }

  public printTable() {}
}
