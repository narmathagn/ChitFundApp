import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { User } from '../../../models/user.model';
import { UserService } from '../userService';

@Component({
  selector: 'app-user-list',
  imports: [NgFor],
  standalone: true,
  templateUrl: './user-list.html',
  styleUrl: './user-list.css'
})
export class UserList  implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((res: any) => {
      console.log(res);
      this.users = res;
    }, error => {
      console.error('Error loading users:', error);
    });
  }

  editUser(id: string) {
    this.router.navigate([`/dashboard/users/edit/${id}`]);
  }

  goToCreate() {
    this.router.navigate(['/dashboard/users/create']);
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe(() => {
      console.log('User deleted successfully');
      alert('User deleted successfully');
      this.loadUsers(); // Reload after delete
    }, (error) => {
      console.error('Error deleting user:', error);
    });
  }
}