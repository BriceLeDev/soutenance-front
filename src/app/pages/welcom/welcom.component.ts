import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import AOS from 'aos';
import { Swiper, SwiperOptions } from 'swiper/types';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-welcom',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './welcom.component.html',
  styleUrl: './welcom.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class WelcomComponent implements OnInit{

  images: string[] = [
    'https://picsum.photos/id/1015/600/300',
    'https://picsum.photos/id/1020/600/300',
    'https://picsum.photos/id/1025/600/300',
    'https://picsum.photos/id/1030/600/300',
    'https://picsum.photos/id/1040/600/300'
  ];

  ngOnInit(): void {

          AOS.init(
           {
            duration: 1200, // Durée de l'animation en millisecondes
            once: false,
            mirror: true,     // L'animation ne se joue qu'une seule fois
            offset: 200,
           },
          )
    setTimeout(() => {
      Swal.fire({
        title: 'Bienvenue !',
        text: 'Découvrez nos solutions pour la gestion de panneaux publicitaires.',
        icon: 'info',
        timer: 100000,
        showConfirmButton: false,
        showCloseButton: true,
      });
    }, 2000)

  }

  autoplayConfig = {
    delay: 3000,  // Temps entre chaque slide (en ms)
    disableOnInteraction: false  // Permet de continuer après interaction
  };



  // @ViewChild('swiperRef', { static: false }) swiperRef: any;
  // swiperConfig: SwiperOptions = {
  //   slidesPerView: 1,
  //   loop: true,
  //   autoplay: {
  //     delay: 2000, // Temps en millisecondes
  //     disableOnInteraction: false
  //   }
  // };

  // ngAfterViewInit() {
  //   new Swiper(this.swiperRef.nativeElement, this.swiperConfig);
  // }
}
