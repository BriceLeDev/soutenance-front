import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RouterLinkActive } from '@angular/router';
@Component({
  selector: 'app-customer-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './customer-sidebar.component.html',
  styleUrl: './customer-sidebar.component.css'
})
export class CustomerSidebarComponent {

}
