import { Component, OnInit } from '@angular/core';
import { UserService, UserWithPassword, User } from './user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class UserComponent implements OnInit {
  users: User[] = [];
  newUser: UserWithPassword = { id: 0, username: '', password: '', firstName: '', lastName: '', occupation: '', age: 0 };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.users$.subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onSubmit(): void {
    this.userService.addUser(this.newUser);
    this.newUser = { id: 0, username: '', password: '', firstName: '', lastName: '', occupation: '', age: 0 };
  }

  deleteUser(userId: number): void {
    if (confirm('Do you really want to delete this user?')) {
      this.userService.deleteUser(userId);
    }
  }

  editUser(user: User): void {
    this.userService.toggleEditUser(user);
  }

  updateUser(user: User): void {
    this.userService.updateUser(user);
    this.userService.toggleEditUser(user);
  }
}
