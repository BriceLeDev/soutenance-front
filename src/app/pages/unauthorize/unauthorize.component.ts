import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-unauthorize',
  standalone: true,
  imports: [],
  templateUrl: './unauthorize.component.html',
  styleUrl: './unauthorize.component.css'
})
export class UnauthorizeComponent {

  private route = inject(Router)
   public goHome(){
    this.route.navigate(["welcom"])
    }
}
