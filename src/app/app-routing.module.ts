import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
// import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UsersManagementComponent } from './pages/Admin/users-management/users-management.component';
import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    title: 'Admin',
    children: [
      { path: '', redirectTo: 'adminDashboard', pathMatch: 'full' },
      {
        path: 'adminDashboard',
        component: AdminDashboardComponent,
      },
      {
        path: 'usersManagement',
        component: UsersManagementComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
