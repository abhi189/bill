import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StagingInvoiceComponent } from './staging-invoice.component';
import { StagingInvoiceDetailComponent } from './staging-invoice-detail.component';
import { StagingInvoicePopupComponent } from './staging-invoice-dialog.component';
import { StagingInvoiceDeletePopupComponent } from './staging-invoice-delete-dialog.component';

export const stagingInvoiceRoute: Routes = [
    {
        path: 'staging-invoice',
        component: StagingInvoiceComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staging-invoice/:id',
        component: StagingInvoiceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stagingInvoicePopupRoute: Routes = [
    {
        path: 'staging-invoice-new',
        component: StagingInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-invoice/:id/edit',
        component: StagingInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-invoice/:id/delete',
        component: StagingInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
