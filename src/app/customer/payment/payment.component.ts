import { Component, OnInit } from '@angular/core';
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
export class PaymentComponent implements OnInit {

  constructor(
    public sharedService : SharedServiceService,
    private router: Router
  ){}
  public paymentLink : string | null = ""
  ngOnInit(): void {
      this.paymentLink=localStorage.getItem("paymentUrl")
      console.info("Lien de payement")
      console.log(this.paymentLink)
      console.info(" ici Lien de payement")

  }

  public navigateTo() {
    if (this.paymentLink) {
      window.location.href = this.paymentLink;
      console.info("info")
    } else {
      console.error('Payment link is undefined or invalid');
    }
  }
  

}
