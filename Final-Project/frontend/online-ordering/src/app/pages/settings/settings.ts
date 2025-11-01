import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-settings',
   standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class Settings {

}

