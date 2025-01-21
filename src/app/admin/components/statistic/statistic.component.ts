/*
 *****************************************************************
 * Composent Voir plus de détail sur un client                   *
 *****************************************************************
 */
import { Component, OnInit, inject } from '@angular/core';
import { SharedServiceService } from '../../admin-services/shared-service.service';

@Component({
  selector: 'app-statistic',
  standalone: true,
  imports: [],
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.css',
})
export class StatisticComponent implements OnInit {
  public AdminState = inject(SharedServiceService);
  NbrTotalClient!:number
  ngOnInit(): void {
    this.NbrTotalClient = this.AdminState.AdminClientState.NbrClient();
  }
}
