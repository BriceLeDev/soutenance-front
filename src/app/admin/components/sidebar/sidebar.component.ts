import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  navlinks = [
    {path:"abonnements", libele:"Abonnements"},
    {path:"client", libele:"Clients"},
    {path:"panneau", libele:"panneaux"},
    {path:"boulevard", libele:"Boulevards"},
  ]

}
