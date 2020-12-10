import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import { MeterService, MeterPopupService, MeterDialogComponent, MeterResolvePagingParams, MeterPopupComponent, meterPopupRoute } from './';

const ENTITY_STATES = [...meterPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [MeterDialogComponent, MeterPopupComponent],
    entryComponents: [MeterDialogComponent, MeterPopupComponent],
    providers: [MeterService, MeterPopupService, MeterResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebMeterModule {}
