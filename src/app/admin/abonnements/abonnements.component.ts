import { Component, OnInit } from '@angular/core';
import { AbonnementService } from '../../openapi/services/services';
import { PageResponseAbonnementResponse } from '../../openapi/services/models';

@Component({
  selector: 'app-abonnements',
  standalone: true,
  imports: [],
  templateUrl: './abonnements.component.html',
  styleUrl: './abonnements.component.css'
})
export class AbonnementsComponent implements OnInit{


constructor(private abnService : AbonnementService){}
 public lesAbonnements: PageResponseAbonnementResponse = {};
ngOnInit(): void {

}

  public getAbonById() {

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
