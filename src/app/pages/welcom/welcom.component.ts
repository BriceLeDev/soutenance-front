import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-welcom',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './welcom.component.html',
  styleUrl: './welcom.component.css',
})
export class WelcomComponent {}
