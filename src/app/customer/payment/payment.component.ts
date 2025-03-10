import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import { Route, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { Console } from 'console';
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
  public paymentLink2: string | null = '';
  public showComponent = false;
  ngOnInit(): void {
    // setTimeout(() => {
    //   console.info('Lien de paiement');
    //   this.paymentLink = localStorage.getItem('paymentUrl');
    //   this.showComponent = true;
    //   this.cdRef.detectChanges(); // Déclenche la détection des changements pour l'affichage
    // }, 1000);
    console.log("this.paymentLink2 initialisation")
    const navigation = window.history.state;
    // console.log(navigation)
    // console.log(navigation.paymentUrl)
  if (navigation) {
    this.showComponent = true;
    console.log("this.paymentLink2 in if 1")
    console.log(navigation.paymentUrl)
    this.paymentLink2 = navigation.paymentUrl;
    console.log(this.paymentLink2)
    console.log("this.paymentLink2 in if 2" )
  }

  }

  // public chargePayment() {
  //   this.paymentLink = localStorage.getItem('paymentUrl');
  //   this.cdRef.detectChanges();
  // }


  public navigateTo() {
    console.log('Redirection vers:', this.paymentLink2);
    if (this.paymentLink2) {
      console.log('Redirection vers:', this.paymentLink2);
      window.location.href = this.paymentLink2;
      localStorage.removeItem('selectedPanneaux');
      localStorage.removeItem('paymentUrl');
      localStorage.removeItem('totalAmount');
  }
}
  ngOnDestroy(): void {
   localStorage.removeItem('selectedPanneaux');
   localStorage.removeItem('paymentUrl');
   localStorage.removeItem('totalAmount');
  }

  // reloadComponent(): void {
  //   this.showComponent = false;
  //   setTimeout(() => (this.showComponent = true), 500);
  // }
}
