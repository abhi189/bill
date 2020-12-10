import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    AdjustmentService,
    AdjustmentPopupService,
    AdjustmentComponent,
    AdjustmentDetailComponent,
    AdjustmentDialogComponent,
    AdjustmentPopupComponent,
    AdjustmentDeletePopupComponent,
    AdjustmentDeleteDialogComponent,
    adjustmentRoute,
    adjustmentPopupRoute,
    AdjustmentResolvePagingParams
} from './';

const ENTITY_STATES = [...adjustmentRoute, ...adjustmentPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AdjustmentComponent,
        AdjustmentDetailComponent,
        AdjustmentDialogComponent,
        AdjustmentDeleteDialogComponent,
        AdjustmentPopupComponent,
        AdjustmentDeletePopupComponent
    ],
    entryComponents: [
        AdjustmentComponent,
        AdjustmentDialogComponent,
        AdjustmentPopupComponent,
        AdjustmentDeleteDialogComponent,
        AdjustmentDeletePopupComponent
    ],
    providers: [AdjustmentService, AdjustmentPopupService, AdjustmentResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebAdjustmentModule {}
