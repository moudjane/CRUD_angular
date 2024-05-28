import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login(this.username, this.password).subscribe(
      response => {
        this.message = 'Login successful!';
        console.log(response);
        this.authService.setLoggedIn(true);
        this.router.navigate(['/users']);
      },
      error => {
        this.message = 'Invalid credentials';
        console.log(error);
      }
    );
  }

  switchToRegister(): void {
    this.router.navigate(['/register']);
  }
}
