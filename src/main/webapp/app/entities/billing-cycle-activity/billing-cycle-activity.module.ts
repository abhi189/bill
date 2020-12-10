import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    BillingCycleActivityService,
    BillingCycleActivityPopupService,
    BillingCycleActivityComponent,
    BillingCycleActivityDetailComponent,
    BillingCycleActivityDialogComponent,
    BillingCycleActivityPopupComponent,
    BillingCycleActivityDeletePopupComponent,
    BillingCycleActivityDeleteDialogComponent,
    billingCycleActivityRoute,
    billingCycleActivityPopupRoute,
    BillingCycleActivityResolvePagingParams
} from './';

const ENTITY_STATES = [...billingCycleActivityRoute, ...billingCycleActivityPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        BillingCycleActivityComponent,
        BillingCycleActivityDetailComponent,
        BillingCycleActivityDialogComponent,
        BillingCycleActivityDeleteDialogComponent,
        BillingCycleActivityPopupComponent,
        BillingCycleActivityDeletePopupComponent
    ],
    entryComponents: [
        BillingCycleActivityComponent,
        BillingCycleActivityDialogComponent,
        BillingCycleActivityPopupComponent,
        BillingCycleActivityDeleteDialogComponent,
        BillingCycleActivityDeletePopupComponent
    ],
    providers: [BillingCycleActivityService, BillingCycleActivityPopupService, BillingCycleActivityResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    exports: [BillingCycleActivityComponent]
})
export class BillingWebBillingCycleActivityModule {}
