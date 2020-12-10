import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    ExpectedSavingsService,
    ExpectedSavingsPopupService,
    ExpectedSavingsComponent,
    ExpectedSavingsDetailComponent,
    ExpectedSavingsDialogComponent,
    ExpectedSavingsPopupComponent,
    ExpectedSavingsDeletePopupComponent,
    ExpectedSavingsDeleteDialogComponent,
    expectedSavingsRoute,
    expectedSavingsPopupRoute,
    ExpectedSavingsResolvePagingParams
} from './';

const ENTITY_STATES = [...expectedSavingsRoute, ...expectedSavingsPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExpectedSavingsComponent,
        ExpectedSavingsDetailComponent,
        ExpectedSavingsDialogComponent,
        ExpectedSavingsDeleteDialogComponent,
        ExpectedSavingsPopupComponent,
        ExpectedSavingsDeletePopupComponent
    ],
    entryComponents: [
        ExpectedSavingsComponent,
        ExpectedSavingsDialogComponent,
        ExpectedSavingsPopupComponent,
        ExpectedSavingsDeleteDialogComponent,
        ExpectedSavingsDeletePopupComponent
    ],
    providers: [ExpectedSavingsService, ExpectedSavingsPopupService, ExpectedSavingsResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebExpectedSavingsModule {}
