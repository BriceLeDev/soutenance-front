import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedServiceService } from '../../admin/admin-services/shared-service.service';
import { Route, Router, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit, OnDestroy {

  constructor(
    public sharedService : SharedServiceService,
    private router: Router,
    private cdRef : ChangeDetectorRef
  ){}
  public paymentLink : string | null = ""
  public showComponent = false
  ngOnInit(): void {
      this.paymentLink=localStorage.getItem("paymentUrl")
      console.info("Lien de payement")
      console.log(this.paymentLink)
      console.info(" ici Lien de payement")
    this.cdRef.detectChanges()
    this.reloadComponent()
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
  reloadComponent(): void {
    this.showComponent = false;
    setTimeout(() => this.showComponent = true,500);
  }



}
