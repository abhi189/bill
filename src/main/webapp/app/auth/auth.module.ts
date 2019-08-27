import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PortalSharedModule } from 'app/shared';
import { RegisterComponent } from './register/register.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { LoginComponent } from './login/login.component';
import { ResetPassowrdInitComponent } from './reset/reset.component';
import { ResetPasswordCompleteComponent } from './reset-complete/reset-complete.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardModule } from '../dashboard/dashboard.module';

import { AuthRoutes } from './auth.route';

@NgModule({
    imports: [PortalSharedModule, RouterModule.forChild(AuthRoutes), DashboardModule],
    declarations: [
        RegisterComponent,
        LoginComponent,
        ResetPassowrdInitComponent,
        ResetPasswordCompleteComponent,
        RegisterCompleteComponent,
        ChangePasswordComponent
    ],
    exports: [RegisterComponent, ChangePasswordComponent, LoginComponent, ResetPassowrdInitComponent, ResetPasswordCompleteComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeAuthModule {}
