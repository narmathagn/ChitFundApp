import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Plan } from '../../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

   private apiUrl = 'http://localhost:4000/api/plans/';  // Adjust as per your backend URL

 constructor(private http: HttpClient) {}

  getPlans() {
    return this.http.get<any>('http://localhost:4000/api/plans/').pipe(
      map(res => res.plans)  // <-- extract the array from the response
    );
}

  deletePlan(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }
}
