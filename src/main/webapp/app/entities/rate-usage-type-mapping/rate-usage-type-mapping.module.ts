import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    RateUsageTypeMappingService,
    RateUsageTypeMappingPopupService,
    RateUsageTypeMappingComponent,
    RateUsageTypeMappingDetailComponent,
    RateUsageTypeMappingDialogComponent,
    RateUsageTypeMappingPopupComponent,
    RateUsageTypeMappingDeletePopupComponent,
    RateUsageTypeMappingDeleteDialogComponent,
    rateUsageTypeMappingRoute,
    rateUsageTypeMappingPopupRoute,
    RateUsageTypeMappingResolvePagingParams
} from './';
import { RateUsageTypeMappingJobTaskComponent } from './rate-usage-type-mapping-job-task.component';
import {
    RateUsageTypeMappingEditDialogComponent,
    RateUsageTypeMappingEditPopupComponent
} from './rate-usage-type-mapping-edit-dialog.component';

const ENTITY_STATES = [...rateUsageTypeMappingRoute, ...rateUsageTypeMappingPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RateUsageTypeMappingComponent,
        RateUsageTypeMappingDetailComponent,
        RateUsageTypeMappingDialogComponent,
        RateUsageTypeMappingDeleteDialogComponent,
        RateUsageTypeMappingPopupComponent,
        RateUsageTypeMappingDeletePopupComponent,
        RateUsageTypeMappingJobTaskComponent,
        RateUsageTypeMappingEditDialogComponent,
        RateUsageTypeMappingEditPopupComponent
    ],
    entryComponents: [
        RateUsageTypeMappingComponent,
        RateUsageTypeMappingDialogComponent,
        RateUsageTypeMappingPopupComponent,
        RateUsageTypeMappingDeleteDialogComponent,
        RateUsageTypeMappingDeletePopupComponent,
        RateUsageTypeMappingJobTaskComponent,
        RateUsageTypeMappingEditDialogComponent,
        RateUsageTypeMappingEditPopupComponent
    ],
    providers: [RateUsageTypeMappingService, RateUsageTypeMappingPopupService, RateUsageTypeMappingResolvePagingParams],
    exports: [RateUsageTypeMappingJobTaskComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebRateUsageTypeMappingModule {}
