// import { NgModule } from '@angular/core';
// import { RouterModule, Routes } from '@angular/router';
// import { OrdersComponent } from './pages/orders/orders';

// export const routes: Routes = [
//   { path: '', redirectTo: '/orders', pathMatch: 'full' },
//   { path: 'orders', component: OrdersComponent },

// ];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule {}


import { Routes } from '@angular/router';
import { OrdersComponent } from './pages/orders/orders';
import { AuthGuard } from './guard/auth-guard';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { Settings } from './pages/settings/settings';
import { InventoryComponent } from './pages/inventory/inventory';
import { ReportAnalytics } from './pages/report-analytics/report-analytics';
import { Tracking } from './pages/tracking/tracking';
import { UserAuthentication } from './pages/user-authentication/user-authentication';


export const routes: Routes = [
   { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent,canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard] },
   { path: 'inventory', component: InventoryComponent,canActivate: [AuthGuard] },
  { path: 'tracking', component: Tracking ,canActivate: [AuthGuard]},
  { path: 'analytics', component: ReportAnalytics,canActivate: [AuthGuard] },
  { path: 'settings', component: Settings,canActivate: [AuthGuard] },
  { path: 'auth', component: UserAuthentication ,canActivate: [AuthGuard]},
  

  { 
    path: 'orders', 
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' },
  

];



