import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import AOS from 'aos';

@Component({
  selector: 'app-welcom',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './welcom.component.html',
  styleUrl: './welcom.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomComponent implements OnInit{

  ngOnInit(): void {
          AOS.init(
           {
            duration: 1200, // Durée de l'animation en millisecondes
            once: false,
            mirror: true,     // L'animation ne se joue qu'une seule fois
            offset: 200,
           }
          )


  }

  autoplayConfig = {
    delay: 3000,  // Temps entre chaque slide (en ms)
    disableOnInteraction: false  // Permet de continuer après interaction
  };
}
