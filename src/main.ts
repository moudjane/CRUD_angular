import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';
import { provideHttpClient } from '@angular/common/http';
import { AuthGuard } from './app/auth.guard';
import { AuthService } from './app/auth.service';
import { UserService } from './app/user/user.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    AuthGuard,
    AuthService,
    UserService
  ]
}).catch(err => console.error(err));
