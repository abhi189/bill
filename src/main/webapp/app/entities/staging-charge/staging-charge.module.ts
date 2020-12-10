import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    StagingChargeService,
    StagingChargePopupService,
    StagingChargeComponent,
    StagingChargeDetailComponent,
    StagingChargeDialogComponent,
    StagingChargePopupComponent,
    StagingChargeDeletePopupComponent,
    StagingChargeDeleteDialogComponent,
    stagingChargeRoute,
    stagingChargePopupRoute
} from './';

const ENTITY_STATES = [...stagingChargeRoute, ...stagingChargePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StagingChargeComponent,
        StagingChargeDetailComponent,
        StagingChargeDialogComponent,
        StagingChargeDeleteDialogComponent,
        StagingChargePopupComponent,
        StagingChargeDeletePopupComponent
    ],
    entryComponents: [
        StagingChargeComponent,
        StagingChargeDialogComponent,
        StagingChargePopupComponent,
        StagingChargeDeleteDialogComponent,
        StagingChargeDeletePopupComponent
    ],
    providers: [StagingChargeService, StagingChargePopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebStagingChargeModule {}
