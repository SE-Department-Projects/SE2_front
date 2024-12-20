import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/components/button/button.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { AdminDashboardComponent } from './pages/Admin/admin-dashboard/admin-dashboard.component';
import { TableComponent } from './shared/components/table/table.component';
import { CardInfoComponent } from './shared/components/card-info/card-info.component';
import { UsersManagementComponent } from './pages/Admin/users-management/users-management.component';
import { UsersComponent } from './pages/Admin/users/users.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { DetectionHistoryComponent } from './pages/vendor/detection-history/detection-history.component';
import { AddUserComponent } from './pages/Admin/add-user/add-user.component';
import { MapComponent } from './shared/components/map/map.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CheckEmailComponent } from './shared/components/check-email/check-email.component';
import { HttpInterceptorInterceptor } from './core/interceptors/http-interceptor.interceptor';
import { RobotConfigComponent } from './pages/Admin/robot-config/robot-config.component';
import { AddRobotComponent } from './pages/Admin/add-robot/add-robot.component';
import { UserDetailsComponent } from './shared/components/user-details/user-details.component';
import { UpdatePasswordComponent } from './shared/components/update-password/update-password.component';
import { UnauthorizedComponent } from './shared/components/unauthorized/unauthorized.component';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { PieChartComponent } from './shared/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from './shared/charts/line-chart/line-chart.component';
import { HorizontalBarChartComponent } from './shared/charts/horizontal-bar-chart/horizontal-bar-chart.component';
import { ColumnChartComponent } from './shared/charts/column-chart/column-chart.component';
import { VendorLayoutComponent } from './layouts/vendor-layout/vendor-layout.component';
import { VendorDashboardComponent } from './pages/vendor/vendor-dashboard/vendor-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    MainLayoutComponent,
    AuthLayoutComponent,
    AdminLayoutComponent,
    FooterComponent,
    LoginComponent,
    ResetPasswordComponent,
    AdminDashboardComponent,
    TableComponent,
    CardInfoComponent,
    UsersManagementComponent,
    UsersComponent,
    NotfoundComponent,
    DetectionHistoryComponent,
    AddUserComponent,
    MapComponent,
    UserProfileComponent,
    CheckEmailComponent,
    RobotConfigComponent,
    AddRobotComponent,
    UserDetailsComponent,
    UpdatePasswordComponent,
    UnauthorizedComponent,
    LoadingComponent,
    PieChartComponent,
    LineChartComponent,
    HorizontalBarChartComponent,
    ColumnChartComponent,
    VendorLayoutComponent,
    VendorDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleMapsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgxChartsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true, // This ensures that the interceptor will be added to the array of interceptors
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
