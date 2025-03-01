import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AdminFormRequest, PageResponseUserResponse, UserResponse } from '../../openapi/services/models';
import { OwnerService } from '../../openapi/services/services';

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatDatepickerModule,FormsModule],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent implements OnInit{

  UserService = inject(OwnerService);

  public open: boolean = false;
  public startDate: Date | null = null;
  public endDate: Date | null = null;
  public filterItem : string = ""
  public filterSelectItem : string = "Tout"
  public customerResponse:PageResponseUserResponse={};
  public customerResponseArray? : Array<UserResponse> = []
  public customerResponseArrayFilter : Array<UserResponse> = []
  public myerrore: Array<String> = [];

  public adminRequest : AdminFormRequest = {
      email: "",
      nonUtilisateur: "",
      numero: "",
      password: "",
      userRole:  []
  }

  ngOnInit(): void {
      this.getAllAdmin()
  }


  public openModal() {
    this.open = !this.open;
  }
public getAllAdmin(){
  this.UserService.getAllAdmin(
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
        this.customerResponseArray =data.content
        this.customerResponseArrayFilter = [...(this.customerResponseArray || [])]
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

    // public clickOnclient(client : UserResponse){
    //   this.router.navigate(['/admin/client/detail', client.id]);
    // }

    public getByFilterEmail(){
      // alert("cliked")
      console.log(this.filterItem)
      if (!this.filterItem?.trim()) {
        // Si le champ est vide, on affiche tous les customer
        this.customerResponseArrayFilter = [...(this.customerResponseArray || [])];
        return;
      }
      console.log(this.customerResponseArrayFilter)
      this.customerResponseArrayFilter =
        this.customerResponseArray?.filter((c) =>
          c.email?.toLowerCase().includes(this.filterItem.toLowerCase())
        ) || [];
    }

    public addAdmin(){
      this.myerrore = [];
      this.UserService
        .register({
          body: this.adminRequest,
        })
        .subscribe({
          next: (resp) => {
            this.getAllAdmin();
            console.log('good!');
            this.open = false;
          },
          error: (err) => {
            if (err.error.validationError) {
              this.myerrore = err.error.validationError;
              console.log('Mon erreurs :', err);
            }
          },
        });
    }
}
