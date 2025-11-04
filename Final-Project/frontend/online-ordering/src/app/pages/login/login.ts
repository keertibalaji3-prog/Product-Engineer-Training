
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private router = inject(Router);
  private authService = inject(AuthService);
  
  credentials = {
    email: '',
    password: ''
  };

 onSubmit() {
    const username = this.credentials.email;
    const password = this.credentials.password;

    if (this.authService.login(username, password)) {   
      this.router.navigate(['/orders']);               
    } else {
      alert('Invalid username or password');
    }
  }
} 

