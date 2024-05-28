import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.authService.register(this.username, this.password).subscribe(
      response => {
        this.message = 'Registration successful!';
        console.log(response);
        this.switchToLogin();
      },
      error => {
        this.message = 'Registration failed';
        console.log(error);
      }
    );
  }

  switchToLogin(): void {
    this.router.navigate(['/login']);
  }
}
