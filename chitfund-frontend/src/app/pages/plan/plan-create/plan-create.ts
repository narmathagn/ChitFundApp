import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../../models/plan.model';
import { PlanService } from '../plan';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plan-create',
 imports: [CommonModule, FormsModule],
  templateUrl: './plan-create.html',
  styleUrl: './plan-create.css'
})
export class PlanCreate {

 plan: Plan = {
   name: '',
   duration: 0,
   fixedAmount: 0,
   description: '',
   _id: '',
 };

   loading = false;
  constructor(private planService: PlanService, private router: Router) {}
submit() {
    // basic validation
    if (!this.plan.name?.trim()) {
      alert('Plan name is required');
      return;
    }
    if (!this.plan.duration || this.plan.duration <= 0) {
      alert('Duration must be a positive number of months');
      return;
    }
    if (this.plan.fixedAmount === undefined || this.plan.fixedAmount < 0) {
      alert('Fixed amount must be a non-negative number');
      return;
    }

    this.loading = true;
    const payload = {
      name: this.plan.name!.trim(),
      duration: Number(this.plan.duration),
      fixedAmount: Number(this.plan.fixedAmount),
      description: this.plan.description || ''
    };

    this.planService.createPlan(payload).subscribe({
      next: (created) => {
        this.loading = false;
        alert('Plan created successfully');
        this.router.navigate(['/dashboard/plans']); // adjust to your list route
      },
      error: (err) => {
        this.loading = false;
        console.error('Create plan failed', err);
        alert('Failed to create plan: ' + (err?.error?.message || err.message || 'Server error'));
      }
    });
  }

cancel() {
  this.router.navigate(['/dashboard/plans']);
}

}