import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StagingConsumptionComponent } from './staging-consumption.component';
import { StagingConsumptionDetailComponent } from './staging-consumption-detail.component';
import { StagingConsumptionPopupComponent } from './staging-consumption-dialog.component';
import { StagingConsumptionDeletePopupComponent } from './staging-consumption-delete-dialog.component';

export const stagingConsumptionRoute: Routes = [
    {
        path: 'staging-consumption',
        component: StagingConsumptionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingConsumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staging-consumption/:id',
        component: StagingConsumptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingConsumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stagingConsumptionPopupRoute: Routes = [
    {
        path: 'staging-consumption-new',
        component: StagingConsumptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingConsumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-consumption/:id/edit',
        component: StagingConsumptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingConsumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-consumption/:id/delete',
        component: StagingConsumptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingConsumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
