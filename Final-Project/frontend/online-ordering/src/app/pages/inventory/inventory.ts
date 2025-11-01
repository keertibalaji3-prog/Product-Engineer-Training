import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-inventory',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './inventory.html',
  styleUrls: ['./inventory.css']
})

export class InventoryComponent {} 