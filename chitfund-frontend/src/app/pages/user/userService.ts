import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
 private apiUrl = 'http://localhost:4000/api/users'; // Get List of users
 private baseUrl = 'http://localhost:4000/api/auth/register'; // Add users
constructor(private http: HttpClient) {}

  getUsers(userId?: string): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createUser(userData: any): Observable<any> {
    return this.http.post(this.baseUrl, userData);
  }

  updateUser(id: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
