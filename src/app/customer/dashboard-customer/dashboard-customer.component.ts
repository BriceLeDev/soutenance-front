import { routes } from './../../app.routes';
import { Component, inject, OnInit } from '@angular/core';
import { CustomerSidebarComponent } from '../../components/header/customer-sidebar/customer-sidebar.component';
import { CustomerContentComponent } from '../../components/customer-content/customer-content.component';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-customer',
  standalone: true,
  imports: [
    CustomerSidebarComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard-customer.component.html',
  styleUrl: './dashboard-customer.component.css',
})
export class DashboardCustomerComponent implements OnInit {

  router = inject(Router)

  ngOnInit(): void {
    //this.router.navigate(['/customer/do-abonnement']);  // Navigation vers 'home' dès le chargement
  }
}
