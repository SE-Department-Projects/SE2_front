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
import { DetectionHistoryComponent } from './pages/vendor/detection-history/detection-history.component';
import { AddUserComponent } from './pages/Admin/add-user/add-user.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { CheckEmailComponent } from './shared/components/check-email/check-email.component';
import { RobotConfigComponent } from './pages/Admin/robot-config/robot-config.component';
import { AddRobotComponent } from './pages/Admin/add-robot/add-robot.component';
import { UpdatePasswordComponent } from './shared/components/update-password/update-password.component';
import { roleGuard } from './core/guards/role.guard';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { authGuard } from './core/guards/auth.guard';
import { VendorLayoutComponent } from './layouts/vendor-layout/vendor-layout.component';
import { VendorDashboardComponent } from './pages/vendor/vendor-dashboard/vendor-dashboard.component';
import { UserDetailsComponent } from './shared/components/user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },

      {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
      },
      {
        path: 'resetPassword/:token',
        component: ResetPasswordComponent,
        title: 'Reset Password',
      },
    ],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['admin'],
    },
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
      {
        path: 'robotConfiguration',
        component: RobotConfigComponent,
      },
      {
        path: 'addRobot',
        component: AddRobotComponent,
      },
      {
        path: 'userDetails/:id',
        component: UserDetailsComponent,
        title: 'user details',
      },
    ],
  },
  {
    path: 'vendor',
    component: VendorLayoutComponent,
    title: 'Vendor',
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['vendor'],
    },
    children: [
      {
        path: '',
        redirectTo: 'vendorDashboard',
        pathMatch: 'full',
      },
      {
        path: 'vendorDashboard',
        component: VendorDashboardComponent,
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
    path: 'userProfile',
    canActivate: [authGuard],
    component: UserProfileComponent,
    title: 'Profile',
  },
  {
    path: 'updatePassword',
    canActivate: [authGuard],
    component: UpdatePasswordComponent,
    title: 'Update Password',
  },

  {
    path: 'checkEmail',
    component: CheckEmailComponent,
    title: 'Check Email',
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent,
    title: 'Unauthorized',
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
