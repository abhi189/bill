import { Routes } from '@angular/router';
import { BankInfoComponent } from './bankInfo/bank-info.component';
import { UserRouteAccessService } from 'app/core';

export const ModulesRoutes: Routes = [
    {
        path: 'bank-info',
        data: {
            pageTitle: 'home'
        },
        component: BankInfoComponent
    }
];
