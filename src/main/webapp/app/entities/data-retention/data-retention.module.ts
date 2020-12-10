import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    DataRetentionService,
    DataRetentionPopupService,
    DataRetentionComponent,
    DataRetentionDetailComponent,
    DataRetentionDialogComponent,
    DataRetentionPopupComponent,
    DataRetentionDeletePopupComponent,
    DataRetentionDeleteDialogComponent,
    dataRetentionRoute,
    dataRetentionPopupRoute
} from './';

const ENTITY_STATES = [...dataRetentionRoute, ...dataRetentionPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DataRetentionComponent,
        DataRetentionDetailComponent,
        DataRetentionDialogComponent,
        DataRetentionDeleteDialogComponent,
        DataRetentionPopupComponent,
        DataRetentionDeletePopupComponent
    ],
    entryComponents: [
        DataRetentionComponent,
        DataRetentionDialogComponent,
        DataRetentionPopupComponent,
        DataRetentionDeleteDialogComponent,
        DataRetentionDeletePopupComponent
    ],
    providers: [DataRetentionService, DataRetentionPopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebDataRetentionModule {}
