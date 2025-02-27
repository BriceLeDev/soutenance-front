import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RefreshService } from '../../admin-services/refresh.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  constructor(private refreshService : RefreshService){}

  navlinks = [
    {path:"abonnements", libele:"Abonnements"},
    {path:"client", libele:"Clients"},
    {path:"panneau/panneau-affiche", libele:"Panneaux"},
    {path:"boulevard", libele:"Boulevards"},
    {path:"statistic", libele:"Statistique"},
    {path:"transaction", libele:"Tansaction"},
    {path:"administration", libele:"Administration"},

  ]



}
