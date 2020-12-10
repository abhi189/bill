import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    BillingCycleService,
    BillingCyclePopupService,
    BillingCycleComponent,
    BillingCycleDetailComponent,
    BillingCycleDialogComponent,
    BillingCyclePopupComponent,
    BillingCycleDeletePopupComponent,
    BillingCycleDeleteDialogComponent,
    billingCycleRoute,
    billingCyclePopupRoute,
    BillingCycleResolvePagingParams,
    BillingCycleBudderflyInvoiceRejectionNotesPopUpComponent
} from './';
import { BillingWebBillingCycleActivityModule } from '../billing-cycle-activity/billing-cycle-activity.module';
import { TruncatePipe } from '../../shared/pipe/truncate.pipe';

const ENTITY_STATES = [...billingCycleRoute, ...billingCyclePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES), BillingWebBillingCycleActivityModule],
    declarations: [
        BillingCycleComponent,
        BillingCycleDetailComponent,
        BillingCycleDialogComponent,
        BillingCycleDeleteDialogComponent,
        BillingCyclePopupComponent,
        BillingCycleDeletePopupComponent,
        BillingCycleBudderflyInvoiceRejectionNotesPopUpComponent,
        TruncatePipe
    ],
    entryComponents: [
        BillingCycleComponent,
        BillingCycleDialogComponent,
        BillingCyclePopupComponent,
        BillingCycleDeleteDialogComponent,
        BillingCycleDeletePopupComponent,
        BillingCycleBudderflyInvoiceRejectionNotesPopUpComponent
    ],
    providers: [BillingCycleService, BillingCyclePopupService, BillingCycleResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebBillingCycleModule {}
