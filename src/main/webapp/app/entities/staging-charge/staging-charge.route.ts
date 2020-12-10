import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StagingChargeComponent } from './staging-charge.component';
import { StagingChargeDetailComponent } from './staging-charge-detail.component';
import { StagingChargePopupComponent } from './staging-charge-dialog.component';
import { StagingChargeDeletePopupComponent } from './staging-charge-delete-dialog.component';

export const stagingChargeRoute: Routes = [
    {
        path: 'staging-charge',
        component: StagingChargeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingCharge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staging-charge/:id',
        component: StagingChargeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingCharge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stagingChargePopupRoute: Routes = [
    {
        path: 'staging-charge-new',
        component: StagingChargePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingCharge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-charge/:id/edit',
        component: StagingChargePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingCharge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-charge/:id/delete',
        component: StagingChargeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingCharge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
