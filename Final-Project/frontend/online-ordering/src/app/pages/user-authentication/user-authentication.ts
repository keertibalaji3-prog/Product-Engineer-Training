import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../components/sidebar/sidebar';
import { HeaderComponent } from '../../components/header/header';

@Component({
  selector: 'app-user-authentication',
  standalone: true,
  imports: [CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './user-authentication.html',
  styleUrl: './user-authentication.css',
})
export class UserAuthentication {

}

