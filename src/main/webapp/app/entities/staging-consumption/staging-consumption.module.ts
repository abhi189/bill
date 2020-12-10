import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    StagingConsumptionService,
    StagingConsumptionPopupService,
    StagingConsumptionComponent,
    StagingConsumptionDetailComponent,
    StagingConsumptionDialogComponent,
    StagingConsumptionPopupComponent,
    StagingConsumptionDeletePopupComponent,
    StagingConsumptionDeleteDialogComponent,
    stagingConsumptionRoute,
    stagingConsumptionPopupRoute
} from './';

const ENTITY_STATES = [...stagingConsumptionRoute, ...stagingConsumptionPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StagingConsumptionComponent,
        StagingConsumptionDetailComponent,
        StagingConsumptionDialogComponent,
        StagingConsumptionDeleteDialogComponent,
        StagingConsumptionPopupComponent,
        StagingConsumptionDeletePopupComponent
    ],
    entryComponents: [
        StagingConsumptionComponent,
        StagingConsumptionDialogComponent,
        StagingConsumptionPopupComponent,
        StagingConsumptionDeleteDialogComponent,
        StagingConsumptionDeletePopupComponent
    ],
    providers: [StagingConsumptionService, StagingConsumptionPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebStagingConsumptionModule {}
