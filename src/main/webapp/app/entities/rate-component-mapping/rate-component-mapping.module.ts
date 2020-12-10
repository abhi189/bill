import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    RateComponentMappingService,
    RateComponentMappingPopupService,
    RateComponentMappingComponent,
    RateComponentMappingDetailComponent,
    RateComponentMappingDialogComponent,
    RateComponentMappingPopupComponent,
    rateComponentMappingRoute,
    RateComponentMappingDeletePopupComponent,
    RateComponentMappingDeleteDialogComponent,
    rateComponentMappingPopupRoute,
    RateComponentMappingJobTaskComponent,
    RateComponentMappingResolvePagingParams
} from './';
import {
    RateComponentMappingEditDialogComponent,
    RateComponentMappingEditPopupComponent
} from './rate-component-mapping-edit-dialog.component';

const ENTITY_STATES = [...rateComponentMappingRoute, ...rateComponentMappingPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        RateComponentMappingComponent,
        RateComponentMappingDetailComponent,
        RateComponentMappingDialogComponent,
        RateComponentMappingDeleteDialogComponent,
        RateComponentMappingPopupComponent,
        RateComponentMappingDeletePopupComponent,
        RateComponentMappingJobTaskComponent,
        RateComponentMappingEditDialogComponent,
        RateComponentMappingEditPopupComponent
    ],
    entryComponents: [
        RateComponentMappingComponent,
        RateComponentMappingDialogComponent,
        RateComponentMappingPopupComponent,
        RateComponentMappingDeleteDialogComponent,
        RateComponentMappingDeletePopupComponent,
        RateComponentMappingJobTaskComponent,
        RateComponentMappingEditDialogComponent,
        RateComponentMappingEditPopupComponent
    ],
    providers: [RateComponentMappingService, RateComponentMappingPopupService, RateComponentMappingResolvePagingParams],
    exports: [RateComponentMappingJobTaskComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebRateComponentMappingModule {}
