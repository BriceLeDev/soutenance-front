import { Component, OnInit, inject } from '@angular/core';
import { SharedServiceService } from '../admin-services/shared-service.service';
import { Router } from '@angular/router';
import { OwnerService } from '../../openapi/services/services';
import { PageResponseUserResponse } from '../../openapi/services/models';
import { HttpClient,  } from '@angular/common/http';
import { TokenService } from '../../token/token.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
/*
 ***************************************************************
 * Composent table de la liste des clients                     *
 ***************************************************************
 */

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,FormsModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  UserService = inject(OwnerService);
  public AdminState = inject(SharedServiceService);
  public http = inject(HttpClient);
  public tokenS = inject(TokenService);
  private router = inject(Router);
  private intervelId!: number;
  private page = 1
  private size = 5
  public startDate: Date | null = null;
  public endDate: Date | null = null;
  public customerResponse:PageResponseUserResponse={};

  ngOnInit(): void {
      this.UserService.getAllCustomer(
        {
          page: 0,
          size: 10,
        }
      )
        .subscribe({
          next: (data) => {
           console.log(data)
           console.log("data")
            this.customerResponse=data
            this.AdminState.NbrTotalClient = data.content?.length
          },
          error: (err) => {
            console.error('My Erreur:', err);
          }
        });

  }

  public dateClicked(){
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!")

    }
  }

  formatDate(date: Date | null): string {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    return "";
  }


  public reserachBetween2Date(){

  }

  public reserachByEmail(){

  }

  public clickOnclient(){

  }

  public getSelectItems(){

  }

  /*public getAllCustomers(){
    const  myToken = localStorage.getItem("token")
    if (myToken) {
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + myToken);
      this.http.get("http://localhost:8088/api/v1/owner/all-customer?page=0&size=10", { headers })
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (err) => {
            console.error('Erreur:', err);
          }
        });
    } else {
      console.error('Token non trouvé dans localStorage');
    }
  }*/


}
