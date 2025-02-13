import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { NgOptimizedImage } from '@angular/common';
import AOS from 'aos';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NavbarComponent, NgOptimizedImage],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent  implements OnInit{

  ngOnInit(): void {
    AOS.init(
     {
      duration: 1200, // Durée de l'animation en millisecondes
      once: true,     // L'animation ne se joue qu'une seule fois
      offset: 200,
     }
    )
  }

}
