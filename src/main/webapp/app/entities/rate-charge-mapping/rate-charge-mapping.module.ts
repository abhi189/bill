import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    RateChargeMappingService,
    RateChargeMappingPopupService,
    RateChargeMappingComponent,
    RateChargeMappingJobTaskComponent,
    RateChargeMappingDetailComponent,
    RateChargeMappingDialogComponent,
    RateChargeMappingPopupComponent,
    RateChargeMappingDeletePopupComponent,
    RateChargeMappingDeleteDialogComponent,
    RateChargeMappingEditPopupComponent,
    RateChargeMappingEditDialogComponent,
    rateChargeMappingRoute,
    rateChargeMappingPopupRoute,
    RateChargeMappingResolvePagingParams
} from './';

const ENTITY_STATES = [...rateChargeMappingRoute, ...rateChargeMappingPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RateChargeMappingComponent,
        RateChargeMappingJobTaskComponent,
        RateChargeMappingDetailComponent,
        RateChargeMappingDialogComponent,
        RateChargeMappingDeleteDialogComponent,
        RateChargeMappingEditDialogComponent,
        RateChargeMappingPopupComponent,
        RateChargeMappingEditPopupComponent,
        RateChargeMappingDeletePopupComponent
    ],
    entryComponents: [
        RateChargeMappingComponent,
        RateChargeMappingJobTaskComponent,
        RateChargeMappingDialogComponent,
        RateChargeMappingPopupComponent,
        RateChargeMappingDeleteDialogComponent,
        RateChargeMappingDeletePopupComponent,
        RateChargeMappingEditDialogComponent,
        RateChargeMappingEditPopupComponent
    ],
    providers: [RateChargeMappingService, RateChargeMappingPopupService, RateChargeMappingResolvePagingParams],
    exports: [RateChargeMappingJobTaskComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebRateChargeMappingModule {}
