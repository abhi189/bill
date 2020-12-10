import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    SolutionService,
    SolutionPopupService,
    SolutionComponent,
    SolutionDetailComponent,
    SolutionDialogComponent,
    SolutionPopupComponent,
    SolutionDeletePopupComponent,
    SolutionDeleteDialogComponent,
    solutionRoute,
    solutionPopupRoute,
    SolutionResolvePagingParams
} from './';

const ENTITY_STATES = [...solutionRoute, ...solutionPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        SolutionComponent,
        SolutionDetailComponent,
        SolutionDialogComponent,
        SolutionDeleteDialogComponent,
        SolutionPopupComponent,
        SolutionDeletePopupComponent
    ],
    entryComponents: [
        SolutionComponent,
        SolutionDialogComponent,
        SolutionPopupComponent,
        SolutionDeleteDialogComponent,
        SolutionDeletePopupComponent
    ],
    providers: [SolutionService, SolutionPopupService, SolutionResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebSolutionModule {}
