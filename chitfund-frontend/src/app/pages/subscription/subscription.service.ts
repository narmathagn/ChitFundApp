import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  
 private apiUrl = 'http://localhost:4000/api/subscriptions'; // Get List of subscriptions with pagination
 constructor(private http: HttpClient) {}

  /**
   * Calls backend paginated endpoint.
   * Optional: q and filter (filter = 'username' | 'phone' | 'planId' | 'status')
   */
  getSubscriptions(page: number, limit: number, q?: string, filter?: string): Observable<any> {
    let params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(limit));

    if (q) params = params.set('q', q);
    if (filter) params = params.set('filter', filter);

    return this.http.get<any>(`${this.apiUrl}/paginated`, { params });
  }
}