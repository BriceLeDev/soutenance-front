import { Component, OnInit, inject } from '@angular/core';
// import { BoulevardService } from './../../openapi/services$/services/boulevard.service';
import { BoulevarRequest, BoulevardResponse, PageResponseBoulevardResponse } from '../../openapi/services/models';
import { FormsModule, NgModel } from '@angular/forms';
import { SharedServiceService } from '../admin-services/shared-service.service';
import { BoulevardService } from '../../openapi/services/services';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-boulevard',
  standalone: true,
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatDatepickerModule],
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
  public boulevarRequest: BoulevarRequest = {
    name: '',
  };
  constructor(private boulevardService: BoulevardService) {}
  public boulevardsState = inject(SharedServiceService);

  public startDate: Date | null = null;
  public endDate: Date | null = null;

  ngOnInit(): void {
    this.getAllBoulevard();
  }

  public dateClicked(){
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!")

    }
  }
  public addBoulevard() {
    this.myerrore = [];
    this.boulevardService
      .saveBoulevard({
        body: this.boulevarRequest,
      })
      .subscribe({
        next: (resp) => {
          this.getAllBoulevard();
          console.log(this.getAllBoulevard());
          console.log("good!")
          this.open = false;
        },
        error: (err) => {
          if (err.error.validationError) {
            this.myerrore = err.error.validationError;
            console.log("Mon erreurs :",err);
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
          console.log(resp)
        },
        error: (err) => {},
      });
  }
}
