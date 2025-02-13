/*
 *****************************************************************
 * Composent Voir plus de détail sur un client                   *
 *****************************************************************
 */
import { Component, OnInit, inject } from '@angular/core';
import { SharedServiceService } from '../../admin-services/shared-service.service';
import {
  LigneAbonnementResponse,
  PageResponseAbonnementResponse,
  PageResponseBoulevardResponse,
  PageResponsePanneauResponse,
  PageResponseUserResponse,
  PanneauRquest,
} from '../../../openapi/services/models';
import {
  AbonnementService,
  BoulevardService,
  LigneAbonnmentService,
  OwnerService,
  PanneauService,
} from '../../../openapi/services/services';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { RefreshService } from '../../admin-services/refresh.service';
@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnInit {
  public AdminState = inject(SharedServiceService);
  public lignAbnService = inject(LigneAbonnmentService);
  public boulevardService = inject(BoulevardService);
  public abonnementervice = inject(AbonnementService);
  constructor(private panneauService: PanneauService,private refreshService: RefreshService) {
    Chart.register(...registerables);
  }

  UserService = inject(OwnerService);
  public customerResponse:PageResponseUserResponse={};
  NbrTotalClient?: number;
  NbrTotalBoulevard?: number;
  NbrTotalPanneau?: number;
  public lignAbn: LigneAbonnementResponse[] = [];
  public boulevardresponse: PageResponseBoulevardResponse = {};
  public abonResponse: PageResponseAbonnementResponse = {};
  public labelsData: any[] = [];
  public labelsDataAbn: any[] = [];
  public realData: any[] = [];
  public realDataAbn: any[] = [];
  public clorData: any[] = [];
  public nbr: number = 0;
  private myChart!: Chart;
  showComponent: boolean = true;

  public panneauResponsePage: PageResponsePanneauResponse = {};

  public colors: string[] = [
    'violet',
    'blue',
    'green',
    'yellow',
    'purple',
    'orange',
    'pink',
    'brown',
    'cyan',
    'magenta',
    'lime',
    'teal',
    'indigo',
    'red',
    'gold',
    'silver',
    'beige',
    'coral',
    'turquoise',
    'olive',
  ];

  private mois = [
    { numero: '01', nom: 'Janvier' },
    { numero: '02', nom: 'Février' },
    { numero: '03', nom: 'Mars' },
    { numero: '04', nom: 'Avril' },
    { numero: '05', nom: 'Mai' },
    { numero: '06', nom: 'Juin' },
    { numero: '07', nom: 'Juillet' },
    { numero: '08', nom: 'Août' },
    { numero: '09', nom: 'Septembre' },
    { numero: '10', nom: 'Octobre' },
    { numero: '11', nom: 'Novembre' },
    { numero: '12', nom: 'Décembre' },
  ];

  private lesMois: any[] = [];
  private lespanneaux : any[]  = [];
  private lesclients: any[] = [];

  ngOnInit(): void {
    this.getAllLigneAbn();
    this.getAllAbn()
    this.getCustomers()
    this.getAllPanneaux()

    // this.getAllLigneAbn(); ALCL
  }

  public getAllLigneAbn() {
    // console.log('in all abonne line');
    this.lignAbnService.getAllLigneAbn().subscribe({
      next: (resp) => {
        this.lignAbn = resp;
        // console.log(' all abonne line');
        console.log(this.lignAbn);
        this.getAllBoulevard();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  public getAllAbn() {
    // console.log('in all abonne line');
    this.abonnementervice.getAllAbonnement().subscribe({
      next: (resp) => {
        this.abonResponse = resp
        this.creatChartAbn()
        this.creatChartPanneau()
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  generateRandomNumber(): number {
    // return Math.floor(Math.random() * 20) + 1;
    return Math.floor(Math.random() * (20 - 1 + 1)) + 1;
  }

  public getAllBoulevard() {
    this.boulevardService
      .boulevardFindAll({
        page: 0,
        size: 10,
      })
      .subscribe({
        next: (resp) => {
          this.boulevardresponse = resp;
          this.NbrTotalBoulevard = resp.content?.length
          this.creatChart();

          console.log(resp);
        },
        error: (err) => {},
      });
  }

  public getCustomers(){
    this.UserService.getAllCustomer(
      {
        page: 0,
        size: 10,
      }
    )
      .subscribe({
        next: (data) => {
          // console.log(data)
          this.customerResponse=data
          this.NbrTotalClient  = data.content?.length

        },
        error: (err) => {
          console.error('My Erreur:', err);
        }
      });
  }


  private getAllPanneaux() {
    this.panneauService
      .getAllPanneaux({
        page: 0,
        size: 10,
      })
      .subscribe({
        next: (resp) => {
          this.panneauResponsePage = resp;
          this.NbrTotalPanneau = resp.content?.length;
          // console.log(resp)
        },
        error: (err) => {
          console.log(err)
        },
      });
  }

  public creatChart() {
    // console.log("this.lespanneaux")
    // console.log("this.boulevardresponse")
    // console.log(this.boulevardresponse.content)
    // console.log("this.lignAbn")
    // console.log(this.lignAbn)
    if (this.boulevardresponse && this.lignAbn) {
      // console.log('in all abonne line verifie b and al');
      this.boulevardresponse.content?.map((blr, bkrx) => {
        this.nbr = 0;
        this.labelsData.push(blr.name);
        this.lignAbn.forEach((lg, idx) => {
          if (lg.boulevardName === blr.name) {
            this.nbr += 1;
          }
          // console.log('bkrx ' + bkrx + 'idx ' + idx);
        });
        this.realData.push(this.nbr);
        this.clorData.push(this.colors[this.generateRandomNumber()]);
        // console.log('in all abonne line adding after');
        // console.log(this.labelsData + ' labelsData');
        // console.log(this.realData + ' realData  ');
        // console.log(this.colors + ' colors');
      });
    }
    this.myChart = new Chart('barchart', {
      type: 'bar',
      data: {
        labels: this.labelsData,
        datasets: [
          {
            label: 'Nombre de demandes',
            data: this.realData,
            backgroundColor: this.colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }

  public creatChartAbn() {
    this.mois.forEach((moi) => {
      this.lesMois.push(moi.nom);
    });

    if (this.abonResponse && this.lesMois) {
      // console.log('in all abonnement verifie b and al');
      this.mois?.map((blr, bkrx) => {
        this.nbr = 0;
        this.abonResponse.content?.forEach((lg, idx) => {
          if (lg.dateAbn?.substring(5, 7) === blr.numero) {
            if (lg.prix !=undefined ) {
              this.nbr = lg.prix + this.nbr ;
            }
          }
          // console.log('lg.dateAbn?.substring(8, 10) ' + lg.dateAbn?.substring(8, 10) + 'blr.numero ' + blr.numero);
          // console.log('nbrFois ' + this.nbr + 'idx ' + idx);
        });
        this.realDataAbn.push(this.nbr);
        this.clorData.push(this.colors[this.generateRandomNumber()]);
        // console.log('in all abonne line adding after');
        // console.log(this.labelsData + ' labelsData');
        // console.log(this.realData + ' realData  ');
        // console.log(this.colors + ' colors');
      });
    }
    this.myChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: this.lesMois,
        datasets: [
          {
            label: "Chiffre d'affaire Mensuel de l'année courante",
            data: this.realDataAbn,
            backgroundColor: this.colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }
  public creatChartClient() {
    this.mois.forEach((moi) => {
      this.lesMois.push(moi.nom);
    });

    if (this.abonResponse && this.lesMois) {
      // console.log('in all abonnement verifie b and al');
      this.mois?.map((blr, bkrx) => {
        this.nbr = 0;
        this.abonResponse.content?.forEach((lg, idx) => {
          if (lg.dateAbn?.substring(5, 7) === blr.numero) {
            if (lg.prix !=undefined ) {
              this.nbr = lg.prix + this.nbr ;
            }
          }
          // console.log('lg.dateAbn?.substring(8, 10) ' + lg.dateAbn?.substring(8, 10) + 'blr.numero ' + blr.numero);
          // console.log('nbrFois ' + this.nbr + 'idx ' + idx);
        });
        this.realDataAbn.push(this.nbr);
        this.clorData.push(this.colors[this.generateRandomNumber()]);
        // console.log('in all abonne line adding after');
        // console.log(this.labelsData + ' labelsData');
        // console.log(this.realData + ' realData  ');
        // console.log(this.colors + ' colors');
      });
    }
    this.myChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: this.lesMois,
        datasets: [
          {
            label: "Chiffre d'affaire Mensuel de l'année courante",
            data: this.realDataAbn,
            backgroundColor: this.colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }

  // Graph des panneaux les plus solicité
  public creatChartPanneau() {
    // console.log("this.lespanneaux")
    // console.log("this.panneauResponsePage")
    // console.log(this.panneauResponsePage.content)
    // console.log("this.lignAbn")
    // console.log(this.lignAbn)
    if (this.panneauResponsePage && this.lignAbn) {
      // console.log('in all abonnement verifie b and al');
      this.panneauResponsePage.content?.map((blr, bkrx) => {
        this.nbr = 0;
        this.lignAbn.forEach((lg, idx) => {
          if (lg.panneauId === blr.id) {

              this.nbr = 1 + this.nbr ;

          }
          // console.log('lg.dateAbn?.substring(8, 10) ' + lg.dateAbn?.substring(8, 10) + 'blr.numero ' + blr.numero);
          // console.log('nbrFois ' + this.nbr + 'idx ' + idx);
        });
        this.lespanneaux.push(blr.id)
        console.log("this.lespanneaux")
        console.log(this.lespanneaux)
        this.realDataAbn.push(this.nbr);
        this.clorData.push(this.colors[this.generateRandomNumber()]);
        // console.log('in all abonne line adding after');
        // console.log(this.labelsData + ' labelsData');
        // console.log(this.realData + ' realData  ');
        // console.log(this.colors + ' colors');
      });
    }
    this.myChart = new Chart('panneau', {
      type: 'bar',
      data: {
        labels: this.lespanneaux,
        datasets: [
          {
            label: "Les panneaux les plus solicités",
            data: this.realDataAbn,
            backgroundColor: this.colors,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: 'top',
          },
        },
      },
    });
  }


}
