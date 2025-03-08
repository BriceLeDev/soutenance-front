import { Component, OnInit } from '@angular/core';
import { AbonnementCardComponent } from '../../components/abonnement-card/abonnement-card.component';
import {
  AbonnementService,
  OwnerService,
} from '../../openapi/services/services';
import {

  Abonnement,
  PageResponseAbonnementResponse,
  UserResponse,
} from '../../openapi/services/models';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-all-abonnement',
  standalone: true,
  imports: [AbonnementCardComponent,MatFormFieldModule,MatInputModule,MatDatepickerModule,FormsModule],
  templateUrl: './all-abonnement.component.html',
  styleUrl: './all-abonnement.component.css',
})
export class AllAbonnementComponent implements OnInit {
  constructor(
    private abonnementService: AbonnementService,
    private decoderService: JwtDecodeService,
    private userService: OwnerService,
    private route : Router
  ) {}

  public lesAbonnements: PageResponseAbonnementResponse = {};
  private user: UserResponse = {
    accountLocked: false,
    createdAT: '',
    email: '',
    enabled: true,
    fidelisation: false,
    id: 0,
    nonUtilisateur: '',
    numero: '',
    roleList: [],
    updateAt: '',
  };
  public startDate: Date | null = null;
  public endDate: Date | null = null;
  ngOnInit(): void {

    this.getUser()
    // this.getAbonById()
  }

  public dateClicked(){
    if (this.startDate === null) {
      alert(" Veuillez Choisir d'abord la date début!")

    }
  }

  public voirPlus(id: number | undefined) {
    // Vérifiez si les valeurs ne sont pas undefined avant de naviguer
    if (id) {
      this.route.navigate(['customer', 'abonnement', 'detail', id]);
    } else {
      console.error('Les paramètres sont manquants !');
    }
  }

  private getUser() {
    const email: string = this.decoderService.getEmail();
    this.userService
      .getUserByEmail({
        email: email,
      })
      .subscribe({
        next: (data) => {
          this.user = data;
          console.log(this.user);
          this.getAbonById(this.user.id)
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public getAbonById(id : number) {

    this.abonnementService
      .getAbonnementByOwner({
        'user-id': id,
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
