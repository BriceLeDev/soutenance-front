import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-no-found',
  standalone: true,
  imports: [],
  templateUrl: './no-found.component.html',
  styleUrl: './no-found.component.css'
})
export class NoFoundComponent {

  private route = inject(Router)
  public goHome(){
    this.route.navigate(["welcom"])
  }
}
