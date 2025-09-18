import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Plan } from '../../../models/plan.model';
import { ActivatedRoute, Router } from '@angular/router';
import { PlanService } from '../plan';

@Component({
  selector: 'app-plan-edit',
   standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './plan-edit.html',
  styleUrl: './plan-edit.css'
})
export class PlanEdit implements OnInit {
  planId!: string;
  plan: Plan = {
    _id: '',
    name: '',
    fixedAmount: 0,
    duration: 0,
    description: ''
  };
  constructor(
    private route: ActivatedRoute, private planService: PlanService,private router: Router
  ) {}
  
  ngOnInit(): void {
    this.planId = this.route.snapshot.paramMap.get('id')!;
    this.loadPlan();
  }
   loadPlan() {
    this.planService.getPlanById(this.planId).subscribe({
      next: (res) => this.plan = res,
      error: (err) => console.error('Error fetching plan', err)
    });
  }

  updatePlan() {
    if (!this.plan.name || !this.plan.fixedAmount || !this.plan.duration) {
      alert('Please fill in required fields');
      return;
    }
this.planService.updatePlan(this.planId, this.plan).subscribe({
      next: () => {
        alert('Plan updated successfully!');
        this.router.navigate(['/dashboard/plans']);
      },
      error: (err) => console.error('Error updating plan', err)
    });
  }

  cancel() {
    this.router.navigate(['/dashboard/plans']);
  }
}