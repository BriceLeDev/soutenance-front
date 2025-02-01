import { routes } from './../../app.routes';
import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerSidebarComponent } from '../../components/header/customer-sidebar/customer-sidebar.component';
import { CustomerContentComponent } from '../../components/customer-content/customer-content.component';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MessageControllerService } from '../../openapi/services/services';
import { JwtDecodeService } from '../../jwt/jwt-decode.service';
import { Message } from '../../openapi/services/models';

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
  public nbrOfMsg = signal(2)
  public messages : Array<Message> = []
  public newMessageLength : number = 0
  public oldMessageLength : number = 0
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
    if(this.oldMessageLength==this.newMessageLength){
      console.log("verification en cours et aboutis")
      this.nbrOfMsg.set(0)
    }else if (this.newMessageLength > this.oldMessageLength ) {
      this.nbrOfMsg.set(this.newMessageLength - this.oldMessageLength)
    }
  }

  public getAllMessageByUser(){
    console.log("changement en cours")
    this.oldMessageLength = this.newMessageLength
    console.log("recupération en cours")
    this.messaService.getMessageByUser({
      userId : this.email
    }).subscribe({
      next : (data)=>{
        this.messages = data
        this.newMessageLength = this.messages.length
        console.log(data)
      },
      error : (err)=>{
        console.log(err)
      }
    })
  }
}
