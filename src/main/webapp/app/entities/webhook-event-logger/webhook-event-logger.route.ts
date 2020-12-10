import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WebhookEventLoggerComponent } from './webhook-event-logger.component';
import { WebhookEventLoggerDetailComponent } from './webhook-event-logger-detail.component';
import { WebhookEventLoggerPopupComponent } from './webhook-event-logger-dialog.component';
import { WebhookEventLoggerDeletePopupComponent } from './webhook-event-logger-delete-dialog.component';

export const webhookEventLoggerRoute: Routes = [
    {
        path: 'webhook-event-logger',
        component: WebhookEventLoggerComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.webhookEventLogger.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'webhook-event-logger/:id',
        component: WebhookEventLoggerDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.webhookEventLogger.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const webhookEventLoggerPopupRoute: Routes = [
    // {
    //    path: 'webhook-event-logger-new',
    //    component: WebhookEventLoggerPopupComponent,
    //    data: {
    //        authorities: ['ROLE_USER'],
    //        pageTitle: 'billingWebApp.webhookEventLogger.home.title'
    //    },
    //    canActivate: [UserRouteAccessService],
    //    outlet: 'popup'
    // },
    // {
    //    path: 'webhook-event-logger/:id/edit',
    //    component: WebhookEventLoggerPopupComponent,
    //    data: {
    //        authorities: ['ROLE_USER'],
    //        pageTitle: 'billingWebApp.webhookEventLogger.home.title'
    //    },
    //    canActivate: [UserRouteAccessService],
    //    outlet: 'popup'
    // },
    // {
    //    path: 'webhook-event-logger/:id/delete',
    //    component: WebhookEventLoggerDeletePopupComponent,
    //    data: {
    //        authorities: ['ROLE_USER'],
    //        pageTitle: 'billingWebApp.webhookEventLogger.home.title'
    //    },
    //    canActivate: [UserRouteAccessService],
    //    outlet: 'popup'
    // }
];
