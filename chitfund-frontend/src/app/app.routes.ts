import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';
import { authGuard } from './auth.guard';
import { UserList } from './pages/user/user-list/user-list';
import { UserCreate } from './pages/user/user-create/user-create';
import { UserEdit } from './pages/user/user-edit/user-edit';
import { PlanList } from './pages/plan/plan-list/plan-list';
import { PlanCreate } from './pages/plan/plan-create/plan-create';
import { PlanEdit } from './pages/plan/plan-edit/plan-edit';
import { SubscriptionList } from './pages/subscription/subscription-list/subscription-list';

export const routes: Routes = [
    { path: 'login', component: Login },
    { path: 'dashboard', component: AdminDashboard ,
        children: [
            { path: 'users', component: UserList },
            { path: 'users/create', component: UserCreate },
            { path: 'users/edit/:id', component: UserEdit },
            { path: 'plans', component: PlanList },
            { path: 'plans/create', component: PlanCreate },
            { path: 'plans/edit/:id', component: PlanEdit },
            { path: 'subscriptions', component: SubscriptionList },
            { path: '', redirectTo: 'users', pathMatch: 'full' }
        ],
        canActivate: [authGuard]
    },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
