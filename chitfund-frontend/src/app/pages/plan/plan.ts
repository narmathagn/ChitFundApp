import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Plan } from '../../models/plan.model';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

   private apiUrl = 'http://localhost:4000/api/plans/';  // Adjust as per your backend URL
   private apiCreateUrl ='http://localhost:4000/api/plans/create';

 constructor(private http: HttpClient) {}

  getPlans() {
    return this.http.get<any>(`${this.apiUrl}`).pipe(
      map(res => res.plans)  // <-- extract the array from the response
    );
}

  deletePlan(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}${id}`);
  }

createPlan(plan: Partial<Plan>): Observable<Plan> {
    return this.http.post<Plan>(this.apiCreateUrl, plan);
  }

  updatePlan(id: string, plan: Partial<Plan>) {
    return this.http.put(`${this.apiUrl}${id}`, plan);
  }
getPlanById(id: string): Observable<Plan> {
  return this.http.get<Plan>(`${this.apiUrl}${id}`);
}

}
