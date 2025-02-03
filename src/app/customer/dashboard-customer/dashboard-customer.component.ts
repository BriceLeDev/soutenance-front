import { routes } from './../../app.routes';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerSidebarComponent } from '../../components/header/customer-sidebar/customer-sidebar.component';
import { CustomerContentComponent } from '../../components/customer-content/customer-content.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageControllerService } from '../../openapi/services/services';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { MessageResponse } from '../../openapi/services/models';

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [
    CustomerSidebarComponent,
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './dashboard-customer.component.html',
  styleUrl: './dashboard-customer.component.css',
})
export class DashboardCustomerComponent implements OnInit {

  router = inject(Router)
  messaService = inject(MessageControllerService)
  jwtService = inject(JwtDecodeService)
  public email : string = this.jwtService.getEmail()
  public nbrOfMsg = signal(0)
  public messages : Array<MessageResponse> = []
  public newMessageLength = signal(0)
  public oldMessageLength = signal(0)
  ngOnInit(): void {
    //this.router.navigate(['/customer/do-abonnement']);  // Navigation vers 'home' dès le chargement
    this.getAllMessageByUser()
    this.updateNotification()
  }


  goToMsg(){
    this.router.navigate(["/customer/inbox"])
  }

  updateNotification(){
    console.log("verification en cours")
    if(this.oldMessageLength()==this.newMessageLength()){
      console.log(this.newMessageLength)
      console.log("verification en cours et aboutis if ")
      this.nbrOfMsg.set(0)
      console.log(this.nbrOfMsg.set(0) + "  ***verification en cours ***- if")
    }else if (this.newMessageLength() > this.oldMessageLength() ) {
      console.log(this.newMessageLength)
      this.nbrOfMsg.set(this.newMessageLength() - this.oldMessageLength())
      console.log(this.nbrOfMsg.set(0) + "  ***verification en cours et aboutis***- else")
    }
  }

  public getAllMessageByUser(){
    console.log("changement en cours")
    this.oldMessageLength.set(this.newMessageLength())
    console.log(this.oldMessageLength())
    console.log("recupération en cours")
    this.messaService.getMessageByUser({
      userId : this.email
    }).subscribe({
      next : (data)=>{
        this.messages = data
        this.newMessageLength.set(this.messages.length)
        console.log("Length du data "+this.messages.length)
        console.log(this.newMessageLength() + "  in getMethod")
        if(this.oldMessageLength()==this.newMessageLength()){
          console.log(this.newMessageLength())
          console.log("verification en cours et aboutis if ")
          this.nbrOfMsg.set(0)
          console.log(this.nbrOfMsg.set(0) + "  ***verification en cours ***- if")
        }else if (this.newMessageLength() > this.oldMessageLength() ) {
          console.log(this.newMessageLength)
          this.nbrOfMsg.set(this.newMessageLength() - this.oldMessageLength())
          console.log(this.nbrOfMsg.set(0) + "  ***verification en cours et aboutis***- else")
        }
      },
      error : (err)=>{
        console.log(err)
      }
    })
  }
}
