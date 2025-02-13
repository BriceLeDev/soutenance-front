import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../../openapi/services/services';
import { Abonnement, PageResponseAbonnementResponse } from '../../openapi/services/models';
import { AbonnementCardComponent } from '../../components/abonnement-card/abonnement-card.component';
import { Route, Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-abonnements',
  standalone: true,
  imports: [AbonnementCardComponent,FormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule],
  templateUrl: './abonnements.component.html',
  styleUrl: './abonnements.component.css'
})
export class AbonnementsComponent implements OnInit{


constructor(private abnService : AbonnementService, private route : Router){}
 public lesAbonnements: PageResponseAbonnementResponse = {};
 public startDate: Date | null = null;
 public endDate: Date | null = null;
ngOnInit(): void {

  this.getAbonByAll()
}

  public onClickAbonnement(abonnement: Abonnement) {
    this.route.navigateByUrl(`abonnement/${abonnement.id}`);
  }
  public dateClicked(){
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!")

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
          console.log("this.lesAbonnements")
          console.log(this.lesAbonnements)
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
