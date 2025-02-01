import { Component, inject, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importez CommonModule

import {
  AbonnementRequest,
  AbonnementResponse,
  ImageResponse,
} from '../../openapi/services/models';
import { AbonnementService, ImageService } from '../../openapi/services/services';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-abonnement-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './abonnement-card.component.html',
  styleUrl: './abonnement-card.component.css',
})
export class AbonnementCardComponent implements OnInit, OnDestroy {
  constructor(private imageService: ImageService, private abnService : AbonnementService) {}
  public imageUrl: string = '';
  public _image: ImageResponse[] = [];
  public isValid : boolean = true
  public dateDuJour : string = ""
  statutAbonnement: string = '';
  @Input() abonnement: AbonnementResponse = {
    actif: false,
  dateAbn: "",
  dateDebut: "",
  dateFin: "",
  description: "",
  duree: 0,
  id: 0,
  mtnPayer: 0,
  mtnRest: 0,
  nbrJrs: 0,
  prix: 0,
  valid: false
  };


  ngOnInit(): void {
    console.log('this.abonnement');
    console.log(this.abonnement);
    this.getImage();
    this.startSlider();
    console.log(this.abonnement.dateDebut)
    console.log(this.abonnement.dateFin)
    this.getAbonnementStatus(this.abonnement.dateDebut,this.abonnement.dateFin)

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['abonnement'] && this.abonnement?.dateDebut && this.abonnement?.dateFin) {
      this.statutAbonnement = this.getAbonnementStatus(this.abonnement.dateDebut, this.abonnement.dateFin);
    }
  }

  ngOnDestroy(): void {
    this.stopSlider();
  }

  public getImage() {
    this.imageService
      .findAllImages({
        abonnementId: this.abonnement.id,
      })
      .subscribe({
        next: (data) => {
          this._image = data;
          // console.log('this._image[0].picture');
          // console.log(this._image[0].picture);
          // this.imageUrl = 'data:image/jpg;base64,' + this._image[0].picture;
          // console.log('this.imageUrl');
          // console.log(this.imageUrl);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  currentIndex: number = 0;
  private interval: any;



  startSlider(): void {
    this.interval = setInterval(() => {
      this.nextSlide();
    }, 1000); // Change d'image toutes les secondes
  }

  stopSlider(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this._image.length;
  }

  prevSlide(): void {
    this.currentIndex =
      (this.currentIndex - 1 + this._image.length) % this._image.length;
  }

  goToSlide(index: number): void {
    this.currentIndex = index;
  }



  getAbonnementStatus(startDate?: string , endDate?: string): string {
    if (!startDate || !endDate) {
      return 'Date invalide'; // Gestion des cas où l'une des dates est absente
    }
    const today = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (today < start) {
      return 'À venir';  // L'abonnement commence dans le futur
    } else if (today >= start && today <= end) {
      return 'En cours'; // L'abonnement est actuellement actif
    } else {
      return 'Expiré';   // L'abonnement est terminé
    }
  }

 
}
