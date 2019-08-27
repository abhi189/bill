import { Routes } from '@angular/router';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { ResetPasswordCompleteComponent } from './reset-complete/reset-complete.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UserRouteAccessService } from 'app/core';

export const AuthRoutes: Routes = [
    {
        path: 'register/:tokenId',
        data: {
            pageTitle: 'register.title'
        },
        component: RegisterCompleteComponent
    },
    {
        path: 'reset/finish',
        data: {
            pageTitle: 'reset.finish.title'
        },
        component: ResetPasswordCompleteComponent
    },
    {
        path: 'change-password',
        data: {
            authorities: ['ROLE_PORTAL'],
            pageTitle: 'reset.finish.title'
        },
        canActivate: [UserRouteAccessService],
        component: ChangePasswordComponent
    }
];
