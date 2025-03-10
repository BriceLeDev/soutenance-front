import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../../openapi/services/services';
import {
  Abonnement,
  AbonnementResponse,
  PageResponseAbonnementResponse,
} from '../../openapi/services/models';
import { AbonnementCardComponent } from '../../components/abonnement-card/abonnement-card.component';
import { Route, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { isThisQuarter } from 'date-fns';
@Component({
  selector: 'app-abonnements',
  standalone: true,
  imports: [
    AbonnementCardComponent,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
  ],
  templateUrl: './abonnements.component.html',
  styleUrl: './abonnements.component.css',
})
export class AbonnementsComponent implements OnInit {
  constructor(private abnService: AbonnementService, private route: Router) {}
  public lesAbonnements: PageResponseAbonnementResponse = {};
  public abonnementArray?: Array<AbonnementResponse> = [];
  public abonnementArrayFilter?: Array<AbonnementResponse> = [];
  public startDate: Date | null = null;
  public endDate: Date | null = null;
  public selectedPricingType: string = 'Tout';

  ngOnInit(): void {
    this.getAbonByAll();
  }


  public voirPlus(id: number | undefined, userId: string | undefined) {
    // Vérifiez si les valeurs ne sont pas undefined avant de naviguer
    if (id && userId) {
      this.route.navigate(['admin', 'abonnement', 'detail', id, userId]);
    } else {
      console.error('Les paramètres sont manquants !');
    }
  }


  public dateClicked() {
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!");
    }
  }
  public getAbonByAll() {
    this.abnService
      .getAllAbonnement({
        page: 0,
        size: 10,
      })
      .subscribe({
        next: (data) => {
          this.lesAbonnements = data;
          this.abonnementArray = data.content;
          // this.abonnementArray = [...this.abonnementArray || []].reverse()
          console.log('this.lesAbonnements');
          console.log(this.lesAbonnements);
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

  public reserachBetween2Date() {
    this.abnService;
  }

  public getSelectItems() {
  if ( this.selectedPricingType != undefined)
    if (this.selectedPricingType === 'Tout') {
      this.abonnementArrayFilter = [...this.abonnementArray || []]
    }else if (this.selectedPricingType === 'A expiré dans une semaine') {


    }else if (this.selectedPricingType === 'En cours') {
      this.abonnementArrayFilter = this.abonnementArray?.filter(ab => ab.actif === true)
    }else if (this.selectedPricingType === 'A venu') {

    }else if (this.selectedPricingType === 'Expiré') {

    }
  }


}
