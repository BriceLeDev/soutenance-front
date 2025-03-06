import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import { Route, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent implements OnInit, OnDestroy {
  constructor(
    public sharedService: SharedServiceService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private chandDetect: ChangeDetectorRef
  ) {}
  public paymentLink: string | null = '';
  public showComponent = false;
  ngOnInit(): void {
    setTimeout(() => {
      console.info('Lien de payement');
      console.log(this.paymentLink);
      console.info(' ici Lien de payement');
      this.paymentLink = localStorage.getItem('paymentUrl');
      this.showComponent = true;
      this.cdRef.detectChanges();
    }, 1000); // On ajoute un delai d'une seconde avant de lancer la recuperation du localstorage
    // this.reloadComponent();
  }

  public chargePayment() {
    this.chandDetect.detectChanges();
    this.paymentLink = localStorage.getItem('paymentUrl');
  }

  ngOnDestroy(): void {
    localStorage.removeItem('selectedPanneaux');
    localStorage.removeItem('totalAmount');
  }

  public navigateTo() {
    if (this.paymentLink) {
      window.location.href = this.paymentLink;
      localStorage.removeItem('selectedPanneaux');
      localStorage.removeItem('totalAmount');
    } else {
      console.error('Payment link is undefined or invalid');
    }
  }
  // reloadComponent(): void {
  //   this.showComponent = false;
  //   setTimeout(() => (this.showComponent = true), 500);
  // }
}
