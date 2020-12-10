import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DataRetentionComponent } from './data-retention.component';
import { DataRetentionDetailComponent } from './data-retention-detail.component';
import { DataRetentionPopupComponent } from './data-retention-dialog.component';
import { DataRetentionDeletePopupComponent } from './data-retention-delete-dialog.component';

export const dataRetentionRoute: Routes = [
    {
        path: 'data-retention',
        component: DataRetentionComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.dataRetention.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'data-retention/:id',
        component: DataRetentionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.dataRetention.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const dataRetentionPopupRoute: Routes = [
    {
        path: 'data-retention-new',
        component: DataRetentionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.dataRetention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-retention/:id/edit',
        component: DataRetentionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.dataRetention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'data-retention/:id/delete',
        component: DataRetentionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.dataRetention.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
