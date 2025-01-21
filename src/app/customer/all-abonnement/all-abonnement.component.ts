import { Component } from '@angular/core';
import { AbonnementCardComponent } from '../../components/abonnement-card/abonnement-card.component';
@Component({
  selector: 'app-all-abonnement',
  standalone: true,
  imports: [AbonnementCardComponent],
  templateUrl: './all-abonnement.component.html',
  styleUrl: './all-abonnement.component.css'
})
export class AllAbonnementComponent {

}
