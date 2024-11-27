import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
// import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UsersManagementComponent } from './pages/Admin/users-management/users-management.component';
import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './pages/Admin/users/users.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ObserverLayoutComponent } from './layouts/observer-layout/observer-layout.component';
import { ObserverDashboardComponent } from './pages/observer/observer-dashboard/observer-dashboard.component';
import { DetectionHistoryComponent } from './pages/observer/detection-history/detection-history.component';
import { AddUserComponent } from './pages/Admin/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
        title: 'Reset Password',
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
      {
        path: 'users/:role',
        component: UsersComponent,
      },
      {
        path: 'addUser',
        component: AddUserComponent,
      },
    ],
  },
  {
    path: 'observer',
    component: ObserverLayoutComponent,
    title: 'Observer',
    children: [
      {
        path: '',
        redirectTo: 'observerDashboard',
        pathMatch: 'full',
      },
      {
        path: 'observerDashboard',
        component: ObserverDashboardComponent,
        title: 'Dashboard',
      },
      {
        path: 'detectionHistory',
        component: DetectionHistoryComponent,
        title: 'Detection History',
      },
    ],
  },
  {
    path: '**',
    component: NotfoundComponent,
    title: 'Page Not Found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
