import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { StagingMeterComponent } from './staging-meter.component';
import { StagingMeterDetailComponent } from './staging-meter-detail.component';
import { StagingMeterPopupComponent } from './staging-meter-dialog.component';
import { StagingMeterDeletePopupComponent } from './staging-meter-delete-dialog.component';

export const stagingMeterRoute: Routes = [
    {
        path: 'staging-meter',
        component: StagingMeterComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingMeter.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'staging-meter/:id',
        component: StagingMeterDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingMeter.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const stagingMeterPopupRoute: Routes = [
    {
        path: 'staging-meter-new',
        component: StagingMeterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingMeter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-meter/:id/edit',
        component: StagingMeterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingMeter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'staging-meter/:id/delete',
        component: StagingMeterDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.stagingMeter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
