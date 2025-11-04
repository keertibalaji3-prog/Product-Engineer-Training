
import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { Settings } from './pages/settings/settings';
import { InventoryComponent } from './pages/inventory/inventory';
import { Tracking } from './pages/tracking/tracking';
import { UserAuthentication } from './pages/user-authentication/user-authentication';
import { AuthGuard } from './guard/auth-guard';
import { AnalyticsComponent } from './pages/report-analytics/report-analytics';
export const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent},
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
   { path: 'inventory', component: InventoryComponent,canActivate: [AuthGuard] },
  { path: 'tracking', component: Tracking ,canActivate: [AuthGuard]},
  { path: 'analytics', component: AnalyticsComponent,canActivate: [AuthGuard] },
  { path: 'settings', component: Settings,canActivate: [AuthGuard] },
  { path: 'auth', component: UserAuthentication ,canActivate: [AuthGuard]},
  

  { 
    path: 'orders', 
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login', pathMatch: 'full' },
  

];



