import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: any;

  constructor(private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usernameOrPhone: [''],
      password: ['']
    });
  }

submitLogin() {
    const credentials = this.loginForm.value;
    console.log('Submitting login with', credentials);

    fetch('http://localhost:4000/api/auth/login', {  // Your backend login URL
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    })
    .then(res => {
      console.log('Response status:', res.status);
      return res.json();
    })
    .then(data => {
      console.log('Response data:', data);
      if (data.token && data.user.role === 'admin') {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.user._id);
        console.log('Login successful, token stored');
        this.router.navigate(['/dashboard']);
      } else {
        alert('Login failed or not admin');
      }
    })
    .catch(err => {
      console.error('Login error:', err);
      alert('Server error');
    });
  }
}