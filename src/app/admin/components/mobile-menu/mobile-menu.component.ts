import { Component,inject } from '@angular/core';
import { SharedServiceService } from '../../admin-services/shared-service.service';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [],
  templateUrl: './mobile-menu.component.html',
  styleUrl: './mobile-menu.component.css',
})
export class MobileMenuComponent {
  service = inject(SharedServiceService)
  handlClose() {
    this.service.open.set(!this.service.open)
  };
}
