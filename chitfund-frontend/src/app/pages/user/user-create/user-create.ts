import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../models/user.model';
import { UserService } from '../userService';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  imports: [CommonModule, FormsModule],
  templateUrl: './user-create.html',
  styleUrl: './user-create.css'
})
export class UserCreate {

 user: User = {
   name: '',
   username: '',
   email: '',
   phone: '',
   address: '',
   pincode: '',
   password: '',
   role: 'user',
   _id: ''
 };

   loading = false;
   constructor(private userService: UserService, private router: Router) {}

  createUser() {
    console.log('Creating user:', this.user);
    this.userService.createUser(this.user).subscribe((res: any) => {
      console.log('User created successfully:', res);
      alert('User created successfully');
      this.router.navigate(['/dashboard/users']); // Navigate to user list after creation
    }, error => {
      console.error('Error creating user:', error);
    });
  }

  ngOnInit() {
    // Initialize any necessary data here
  }
  cancel() {
  this.router.navigate(['/dashboard/users']); // Navigate back to user list
}
}
