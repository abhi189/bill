import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    WebhookEventLoggerService,
    WebhookEventLoggerPopupService,
    WebhookEventLoggerComponent,
    WebhookEventLoggerDetailComponent,
    WebhookEventLoggerDialogComponent,
    WebhookEventLoggerPopupComponent,
    WebhookEventLoggerDeletePopupComponent,
    WebhookEventLoggerDeleteDialogComponent,
    webhookEventLoggerRoute,
    webhookEventLoggerPopupRoute
} from './';

const ENTITY_STATES = [...webhookEventLoggerRoute, ...webhookEventLoggerPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WebhookEventLoggerComponent,
        WebhookEventLoggerDetailComponent,
        WebhookEventLoggerDialogComponent,
        WebhookEventLoggerDeleteDialogComponent,
        WebhookEventLoggerPopupComponent,
        WebhookEventLoggerDeletePopupComponent
    ],
    entryComponents: [
        WebhookEventLoggerComponent,
        WebhookEventLoggerDialogComponent,
        WebhookEventLoggerPopupComponent,
        WebhookEventLoggerDeleteDialogComponent,
        WebhookEventLoggerDeletePopupComponent
    ],
    providers: [WebhookEventLoggerService, WebhookEventLoggerPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebWebhookEventLoggerModule {}
