import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    StagingMeterService,
    StagingMeterPopupService,
    StagingMeterComponent,
    StagingMeterDetailComponent,
    StagingMeterDialogComponent,
    StagingMeterPopupComponent,
    StagingMeterDeletePopupComponent,
    StagingMeterDeleteDialogComponent,
    stagingMeterRoute,
    stagingMeterPopupRoute
} from './';

const ENTITY_STATES = [...stagingMeterRoute, ...stagingMeterPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StagingMeterComponent,
        StagingMeterDetailComponent,
        StagingMeterDialogComponent,
        StagingMeterDeleteDialogComponent,
        StagingMeterPopupComponent,
        StagingMeterDeletePopupComponent
    ],
    entryComponents: [
        StagingMeterComponent,
        StagingMeterDialogComponent,
        StagingMeterPopupComponent,
        StagingMeterDeleteDialogComponent,
        StagingMeterDeletePopupComponent
    ],
    providers: [StagingMeterService, StagingMeterPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebStagingMeterModule {}
