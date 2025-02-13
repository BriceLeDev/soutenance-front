import { PageResponsePanneauResponse } from './../../openapi/services/models/page-response-panneau-response';
import { Component, inject, OnInit } from '@angular/core';
import {  PanneauRquest, TypePanResponse } from '../../openapi/services/models';
import { SharedServiceService } from '../admin-services/shared-service.service';
import { FormsModule } from '@angular/forms';
import { BoulevardService, PanneauService, TypePanneauService } from '../../openapi/services/services';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-panneau',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule],
  templateUrl: './panneau.component.html',
  styleUrl: './panneau.component.css',
})
export class PanneauComponent implements OnInit{



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
    typePanneau: "",
  };
  public myerrore: Array<String> = [];
  public panneauResponsePage: PageResponsePanneauResponse = {};
  public TypepanneauResponse: Array<TypePanResponse> = [];
  // public typePanneauResponse: TypePanRes
  constructor(private panneauService: PanneauService, private typePanneauService: TypePanneauService) {}



  ngOnInit(): void {
    this.getAllPanneaux();
    this.boulevardresponse
    console.log("myerror")
    console.log(this.myerrore)
    this.getAllTyePanneau()
    this.getAllBoulevard()
  }

  public dateClicked(){
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!")

    }
  }
  public addPanneau() {
    console.log("in add")
    console.log(" log in add "+this.panneauRequst.typePanneau)
    this.panneauService
      .savePanneau({
        body: this.panneauRequst,
      })
      .subscribe({
        next: (resp) => {

          this.getAllPanneaux()
          this.open = false;
        },
        error: (err) => {

    console.log(" log in error" +this.panneauRequst)
          console.log(err);
          if (err.error.validationError) {
            this.myerrore = err.error.validationError;
            console.log(err);
          }else if (err.error.error) {
            this.myerrore = err.error;
            console.log(this.myerrore);
          }
        },
      });
  };


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
          console.log(resp)
        },
        error: (err) => {
          console.log(err)
        },
      });
  }

  public openModal() {
    this.open = !this.open;
    console.log(this.TypepanneauResponse)
}
private getAllBoulevard(){
  this.boulevardService
  .boulevardFindAll({
    page: 0,
    size: 10,
  })
  .subscribe({
    next: (resp) => {
      this.boulevardresponse = resp;
      console.log(resp)
    },
    error: (err) => {
      console.log(err)
    },
  });
}

private getAllTyePanneau(){

console.log("dans typePnnaeu")
  this.typePanneauService
    .getAllType({
    })
    .subscribe({
      next: (resp) => {
        this.TypepanneauResponse = resp;
        console.log("panne type respo")
        console.log(resp)
      },
      error: (err) => {

       console.log("TypePanneau n'est pas sélectionné");
        console.log(err)
       console.log("TypePanneau n'est pas sélectionné");

      },
    })
}
  }

