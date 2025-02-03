import { Component, OnInit } from '@angular/core';
import { AbonnementCardComponent } from '../../components/abonnement-card/abonnement-card.component';
import {
  AbonnementService,
  OwnerService,
} from '../../openapi/services/services';
import {
  
  PageResponseAbonnementResponse,
  UserResponse,
} from '../../openapi/services/models';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
@Component({
  selector: 'app-all-abonnement',
  standalone: true,
  imports: [AbonnementCardComponent],
  templateUrl: './all-abonnement.component.html',
  styleUrl: './all-abonnement.component.css',
})
export class AllAbonnementComponent implements OnInit {
  constructor(
    private abonnementService: AbonnementService,
    private decoderService: JwtDecodeService,
    private userService: OwnerService
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
  ngOnInit(): void {

    this.getUser()
    // this.getAbonById()
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
