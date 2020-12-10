import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    BudderflyInvoiceValidationService,
    BudderflyInvoiceValidationPopupService,
    BudderflyInvoiceValidationComponent,
    BudderflyInvoiceValidationDetailComponent,
    BudderflyInvoiceValidationDialogComponent,
    BudderflyInvoiceValidationPopupComponent,
    BudderflyInvoiceValidationDeletePopupComponent,
    BudderflyInvoiceValidationDeleteDialogComponent,
    budderflyInvoiceValidationRoute,
    budderflyInvoiceValidationPopupRoute,
    BudderflyInvoiceValidationResolvePagingParams
} from './';

const ENTITY_STATES = [...budderflyInvoiceValidationRoute, ...budderflyInvoiceValidationPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BudderflyInvoiceValidationComponent,
        BudderflyInvoiceValidationDetailComponent,
        BudderflyInvoiceValidationDialogComponent,
        BudderflyInvoiceValidationDeleteDialogComponent,
        BudderflyInvoiceValidationPopupComponent,
        BudderflyInvoiceValidationDeletePopupComponent
    ],
    entryComponents: [
        BudderflyInvoiceValidationComponent,
        BudderflyInvoiceValidationDialogComponent,
        BudderflyInvoiceValidationPopupComponent,
        BudderflyInvoiceValidationDeleteDialogComponent,
        BudderflyInvoiceValidationDeletePopupComponent
    ],
    providers: [BudderflyInvoiceValidationService, BudderflyInvoiceValidationPopupService, BudderflyInvoiceValidationResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebBudderflyInvoiceValidationModule {}
