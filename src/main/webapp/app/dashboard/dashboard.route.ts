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
            // authorities: ['ROLE_PORTAL']
        },
        // canActivate: [UserRouteAccessService],
        component: DashboardComponent
        // children: [
        //     {
        //         loadChildren: './dashboard-children.module#DashboardChildrenModule'
        //     }
        // ]
        // children: [
        //     {
        //         path: '',
        //         redirectTo: 'stores',
        //         pathMatch: 'full'
        //     },
        //     {
        //         path: 'stores',
        //         component: DashboardListComponent,
        //         data: {
        //             breadcrumb: 'stores',
        //             pageTitle: 'Budderfly - Stores List'
        //         }
        //     },
        //     {
        //         path: 'payments',
        //         data: {
        //             breadcrumb: 'payments',
        //             label: 'Payments',
        //             url: 'payments',
        //             pageTitle: 'Budderfly - Autopay Form'
        //         },
        //         component: DashboardPaymentsComponent
        //     },
        //     {
        //         path: 'invoices',
        //         data: {
        //             breadcrumb: 'invoice',
        //             label: 'Invoices',
        //             url: 'invoices',
        //             pageTitle: 'Budderfly - Invoices'
        //         },
        //         component: DashboardInvoiceComponent
        //     }
        // ]
    }
];
