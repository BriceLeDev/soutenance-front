import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { WelcomComponent } from './pages/welcom/welcom.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { AuthService } from './services/auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { routes } from './app.routes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    
    CommonModule,
    RouterOutlet,
    WelcomComponent,
    DashboardComponent,
    HttpClientModule,
    FormsModule
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'GestionPanneauFrontEnd';

  private http = inject(AuthService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params['code'] !== undefined) {
        this.http.getToken(params['code']).subscribe((result) => {
          if (result == true) {
            this.router.navigateByUrl('/customers');
          } else {
            this.router.navigateByUrl('/login');
            console.log('No code');
          }
        });
      }
    });
  }
}
