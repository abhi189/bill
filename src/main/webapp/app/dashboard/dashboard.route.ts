import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { UserRouteAccessService } from 'app/core';
import { DashboardListComponent } from './components/list/list.component';
import { DashboardInvoiceComponent } from './components/invoices/invoice.component';

export const DashboardRoutes: Routes = [
    {
        path: '',
        data: {
            breadcrumb: 'main',
            label: 'Invoices',
            url: 'invoices',
            pageTitle: 'dashboard.title'
        },
        component: DashboardComponent
    }
];
