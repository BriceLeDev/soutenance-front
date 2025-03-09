import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import { Route, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
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
      console.info('Lien de paiement');
      this.paymentLink = localStorage.getItem('paymentUrl');
      this.showComponent = true;
      this.cdRef.detectChanges(); // Déclenche la détection des changements pour l'affichage
    }, 1000);
  }

  public chargePayment() {
    this.paymentLink = localStorage.getItem('paymentUrl');
    this.cdRef.detectChanges();
  }


  public navigateTo() {
    if (this.paymentLink) {
      console.log('Redirection vers:', this.paymentLink);
      localStorage.removeItem('selectedPanneaux');
      localStorage.removeItem('totalAmount');

      setTimeout(() => {
        window.location.href = this.paymentLink!;
      }, 500); // Petit délai pour que Angular détecte les changements avant la redirection
    } else {
      console.error('Payment link is undefined or invalid');
    }
  }
  ngOnDestroy(): void {
    localStorage.removeItem('selectedPanneaux');
    localStorage.removeItem('totalAmount');
  }
  // reloadComponent(): void {
  //   this.showComponent = false;
  //   setTimeout(() => (this.showComponent = true), 500);
  // }
}
