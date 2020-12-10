import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    BillingCycleInvoiceActivityService,
    BillingCycleInvoiceActivityPopupService,
    BillingCycleInvoiceActivityComponent,
    BillingCycleInvoiceActivityDetailComponent,
    BillingCycleInvoiceActivityDialogComponent,
    BillingCycleInvoiceActivityPopupComponent,
    BillingCycleInvoiceActivityDeletePopupComponent,
    BillingCycleInvoiceActivityDeleteDialogComponent,
    billingCycleInvoiceActivityRoute,
    billingCycleInvoiceActivityPopupRoute,
    BillingCycleInvoiceActivityResolvePagingParams
} from './';

const ENTITY_STATES = [...billingCycleInvoiceActivityRoute, ...billingCycleInvoiceActivityPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BillingCycleInvoiceActivityComponent,
        BillingCycleInvoiceActivityDetailComponent,
        BillingCycleInvoiceActivityDialogComponent,
        BillingCycleInvoiceActivityDeleteDialogComponent,
        BillingCycleInvoiceActivityPopupComponent,
        BillingCycleInvoiceActivityDeletePopupComponent
    ],
    entryComponents: [
        BillingCycleInvoiceActivityComponent,
        BillingCycleInvoiceActivityDialogComponent,
        BillingCycleInvoiceActivityPopupComponent,
        BillingCycleInvoiceActivityDeleteDialogComponent,
        BillingCycleInvoiceActivityDeletePopupComponent
    ],
    providers: [
        BillingCycleInvoiceActivityService,
        BillingCycleInvoiceActivityPopupService,
        BillingCycleInvoiceActivityResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebBillingCycleInvoiceActivityModule {}
