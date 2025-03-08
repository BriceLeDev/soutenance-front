import { PageResponsePanneauResponse } from './../../openapi/services/models/page-response-panneau-response';
import { Component, inject, OnInit } from '@angular/core';
import {
  PanneauResponse,
  PanneauRquest,
  TypePanResponse,
} from '../../openapi/services/models';
import { SharedServiceService } from '../admin-services/shared-service.service';
import { FormsModule } from '@angular/forms';
import {
  BoulevardService,
  PanneauService,
  TypePanneauService,
} from '../../openapi/services/services';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-panneau',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './panneau.component.html',
  styleUrl: './panneau.component.css',
})
export class PanneauComponent implements OnInit {
  public open: boolean = false;

  public state = inject(SharedServiceService);
  public boulevardService = inject(BoulevardService);
  public boulevardresponse = this.state.boulevardresponse;
  public panneauResponse = this.state.panneauResponse;
  public startDate: Date | null = null;
  public endDate: Date | null = null;
  public panneauRequst: PanneauRquest = {
    boulevard_id: 0,
    localisation: '',
    prixMensuel: 0,
    taille: 0,
    typePanneau: '',
  };
  public myerrore: Array<String> = [];
  public panneauResponsePage: PageResponsePanneauResponse = {};
  public TypepanneauResponse: Array<TypePanResponse> = [];
  public panneauResponseArray?: Array<PanneauResponse> = [];
  public panneauResponseArrayFilter?: Array<PanneauResponse> = [];
  public filterItem: string = '';
  public filterSelectItem: string = 'Tout';
  public filterItemId: number = 0;
  // public typePanneauResponse: TypePanRes
  constructor(
    private panneauService: PanneauService,
    private typePanneauService: TypePanneauService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllPanneaux();
    this.boulevardresponse;
    console.log('myerror');
    console.log(this.myerrore);
    this.getAllTyePanneau();
    this.getAllBoulevard();
  }

  public dateClicked() {
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!");
    }
  }
  public addPanneau() {
    console.log('in add');
    console.log(' log in add ' + this.panneauRequst.typePanneau);
    this.panneauService
      .savePanneau({
        body: this.panneauRequst,
      })
      .subscribe({
        next: (resp) => {
          this.getAllPanneaux();
          this.open = false;
          this.toastr.success('Panneau ajouté avec succès !!', 'Succès');
        },
        error: (err) => {
          console.log(' log in error' + this.panneauRequst);
          console.log(err);
          if (err.error.validationError) {
            this.myerrore = err.error.validationError;
            console.log(err);
          } else if (err.error.error) {
            this.myerrore = err.error;
            console.log(this.myerrore);
          }
          if (err.status === 409) {
            this.toastr.error(
              'Ce panneau existe déjà. Veuillez vérifier les données.',
              'Conflit',
              {
                positionClass: 'toast-top-center',
                timeOut: 5000,
                closeButton: true,
                progressBar: true,
              }
            );
          } else if (err.error.validationError) {
            this.myerrore = err.error.validationError;
            this.toastr.error(
              'Une erreur de validation est survenue.Veuillez remplir les champs correctement.',
              'Erreur de validation',
              {
                positionClass: 'toast-top-center',
                timeOut: 5000,
                closeButton: true,
                progressBar: true,
              }
            );
          } else {
            this.toastr.error('Une erreur inattendue est survenue.', 'Erreur', {
              positionClass: 'toast-top-center',
              timeOut: 5000,
              closeButton: true,
              progressBar: true,
            });
          }
        },
      });
  }

  private getAllPanneaux() {
    this.panneauService
      .getAllPanneaux({
        page: 0,
        size: 10,
      })
      .subscribe({
        next: (resp) => {
          this.panneauResponse = resp;
          this.state.panneauResponse = resp;
          this.panneauResponseArray = resp.content;
          this.panneauResponseArrayFilter = [
            ...(this.panneauResponseArray || []),
          ];
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  public openModal() {
    this.open = !this.open;
    console.log(this.TypepanneauResponse);
  }
  private getAllBoulevard() {
    this.boulevardService
      .boulevardFindAll({
        page: 0,
        size: 10,
      })
      .subscribe({
        next: (resp) => {
          this.boulevardresponse = resp;
          console.log(resp);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  private getAllTyePanneau() {
    console.log('dans typePnnaeu');
    this.typePanneauService.getAllType({}).subscribe({
      next: (resp) => {
        this.TypepanneauResponse = resp;
        console.log('panne type respo');
        console.log(resp);
      },
      error: (err) => {
        console.log("TypePanneau n'est pas sélectionné");
        console.log(err);
        console.log("TypePanneau n'est pas sélectionné");
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

  public getByFilterBlvName() {
    if (!this.filterItem?.trim()) {
      // Si le champ est vide, on affiche tous les boulevards
      console.warn('Valeur de filterItem: dans if', this.panneauResponseArray);

      this.panneauResponseArrayFilter = [...(this.panneauResponseArray || [])];
      return;
    }
    this.panneauResponseArrayFilter =
      this.panneauResponseArray?.filter((b) =>
        b.boulevardName?.toLowerCase().includes(this.filterItem.toLowerCase())
      ) || [];
    console.warn('Valeur de filterItem: dans else', this.panneauResponseArray);
  }

  public getByFilterBlvId() {
    if (this.filterItemId == 0) {
      // Si le champ est vide, on affiche tous les boulevards

      this.panneauResponseArrayFilter = [...(this.panneauResponseArray || [])];
      return;
    }
    this.panneauResponseArrayFilter = this.panneauResponseArray?.filter(
      (b) => b.id === this.filterItemId
    );
  }

  public getByFilterSelect() {
    if (this.filterSelectItem === 'Tout') {
      this.panneauResponseArrayFilter = [...(this.panneauResponseArray || [])];
      return;
    }
    if (this.filterSelectItem === 'Libre') {
      this.panneauResponseArrayFilter = this.panneauResponseArray?.filter(
        (b) => b.occuped === false
      );
      return;
    }
    if (this.filterSelectItem === 'Occupé') {
      this.panneauResponseArrayFilter = this.panneauResponseArray?.filter(
        (b) => b.occuped === true
      );

      return;
    }
    if (this.filterSelectItem === 'Statique-affiche') {
      this.panneauResponseArrayFilter = this.panneauResponseArray?.filter(
        (b) => b.typePanneauLibele === 'Statique-affiche'
      );

      return;
    }
    if (this.filterSelectItem === 'Numérique-image') {
      this.panneauResponseArrayFilter = this.panneauResponseArray?.filter(
        (b) => b.typePanneauLibele === 'Numérique-image'
      );

      return;
    }
    if (this.filterSelectItem === 'Numérique-vidéo') {
      this.panneauResponseArrayFilter = this.panneauResponseArray?.filter(
        (b) => b.typePanneauLibele === 'Numérique-vidéo'
      );

      return;
    }
  }
}
