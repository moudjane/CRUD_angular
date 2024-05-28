import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080'; // Replace with your actual API URL
  private loggedInStatus = false; // Track login status

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login/${username}`, body, { headers, responseType: 'text', withCredentials: true });
  }

  register(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/register/${username}`, body);
  }

  isLoggedIn(): boolean {
    // Implement actual check for login status, e.g., check for a valid JWT token or session
    return this.loggedInStatus;
  }

  setLoggedIn(status: boolean): void {
    this.loggedInStatus = status;
  }
}
