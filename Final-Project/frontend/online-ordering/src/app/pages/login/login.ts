
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {
  private router = inject(Router);
  
  credentials = {
    email: '',
    password: ''
  };

  onSubmit() {
    
    if (this.credentials.email && this.credentials.password) {
     
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', this.credentials.email);
      
      this.router.navigate(['/orders']);
    } else {
      alert('Please enter email and password');
    }
  }
}