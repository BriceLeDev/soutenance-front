import { Component, inject, OnInit } from '@angular/core';
import { NewMessageComponent } from '../components/new-message/new-message.component';
import { StatisticComponent } from '../components/statistic/statistic.component';
import { SidebarComponent } from '../components/sidebar/sidebar.component';
import { MainComponent } from '../components/main/main.component';
import { MobileMenuComponent } from '../components/mobile-menu/mobile-menu.component';
import { DesktopNavbarComponent } from '../components/desktop-navbar/desktop-navbar.component';
import { Router, RouterOutlet } from '@angular/router';
import { SharedServiceService } from '../admin-services/shared-service.service';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    NewMessageComponent,
    StatisticComponent,
    SidebarComponent,
    MainComponent,
    MobileMenuComponent,
    DesktopNavbarComponent,
    RouterOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit{
  service = inject(SharedServiceService);
  private router = inject(Router)

  openvalue=false;
  handlopen() {
    this.service.open.set(!this.service.open());
  }


  ngOnInit(): void {
    this.router.navigate(['/admin/abonnements']);  // Navigation vers 'home' dès le chargement
  }
}

