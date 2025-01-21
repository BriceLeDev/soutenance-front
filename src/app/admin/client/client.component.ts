import { Component, OnInit, inject } from '@angular/core';
import { SharedServiceService } from '../admin-services/shared-service.service';
import { Router } from '@angular/router';
import { OwnerService } from '../../openapi/services/services';
import { PageResponseUserResponse } from '../../openapi/services/models';
import { HttpClient,  } from '@angular/common/http';
import { TokenService } from '../../token/token.service';

/*
 ***************************************************************
 * Composent table de la liste des clients                     *
 ***************************************************************
 */

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  adminService = inject(OwnerService);
  public AdminState = inject(SharedServiceService);
  public http = inject(HttpClient);
  public tokenS = inject(TokenService);
  private router = inject(Router);
  private intervelId!: number;
  private page = 1
  private size = 5
  public customerResponse:PageResponseUserResponse={};

  ngOnInit(): void {
    // console.log("initiation.....")
    //const  myToken = this.tokenS.getItem
    // console.log(myToken)
    // console.log("myToken")

      this.adminService.getAllCustomer(
        {
          page: 0,
          size: 10,
        }
      )
        .subscribe({
          next: (data) => {
            // console.log(data)
            this.customerResponse=data
          },
          error: (err) => {
            console.error('My Erreur:', err);
          }
        });
        // console.log("ma $$$$ this.http.request$$$ $$")
        // console.log(this.http.request.name)

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
