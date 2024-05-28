import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  occupation: string;
  age: number;
  editing?: boolean; // Optional: for enabling edit mode
}

export interface UserWithPassword extends User {
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];
  private usersSubject = new BehaviorSubject<User[]>([]);

  constructor(private http: HttpClient) {
    this.fetchUsers();
  }

  get users$() {
    return this.usersSubject.asObservable();
  }

  fetchUsers(): void {
    this.http.get<User[]>('http://localhost:8080/users').subscribe(
      (users: User[]) => {
        this.users = users.map(user => ({ ...user, editing: false }));
        this.usersSubject.next([...this.users]);
      },
      (error) => {
        console.log('An error occurred while fetching users:', error);
      }
    );
  }

  addUser(newUser: UserWithPassword): void {
    const userExists = this.users.some(
      user => user.username === newUser.username
    );
    if (userExists) {
      console.log('This user already exists.');
      return;
    }

    this.http.post('http://localhost:8080/save', newUser, { responseType: 'text' }).subscribe(
      () => {
        console.log('User successfully added');
        this.getUsers();
      },
      (error) => {
        console.error('Error adding user', error);
      }
    );
  }

  getUsers(): void {
    this.http.get<User[]>('http://localhost:8080/users').subscribe(
      (users: User[]) => {
        this.users = users.map(user => ({ ...user, editing: false }));
        this.usersSubject.next([...this.users]);
      },
      (error) => {
        console.error('An error occurred while fetching users:', error);
      }
    );
  }

  deleteUser(userId: number): void {
    this.http.delete(`http://localhost:8080/delete/${userId}`, { responseType: 'text' }).subscribe(
      () => {
        console.log(`User with ID ${userId} successfully deleted`);
        this.users = this.users.filter(user => user.id !== userId);
        this.usersSubject.next([...this.users]);
      },
      (error) => {
        console.error(`Error deleting user with ID ${userId}`, error);
      }
    );
  }

  toggleEditUser(user: User): void {
    user.editing = !user.editing;
  }

  updateUser(updatedUser: User): void {
    this.http.put(`http://localhost:8080/update/${updatedUser.id}`, updatedUser).subscribe(
      () => {
        console.log('User successfully updated');
        this.getUsers(); // Refresh the user list after update
      },
      (error) => {
        console.error('Error updating user', error);
      }
    );
  }
}
