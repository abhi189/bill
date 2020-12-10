import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    ExcludedRateService,
    ExcludedRatePopupService,
    ExcludedRateComponent,
    ExcludedRateDetailComponent,
    ExcludedRateDialogComponent,
    ExcludedRatePopupComponent,
    ExcludedRateDeletePopupComponent,
    ExcludedRateDeleteDialogComponent,
    excludedRateRoute,
    excludedRatePopupRoute,
    ExcludedRateResolvePagingParams
} from './';

const ENTITY_STATES = [...excludedRateRoute, ...excludedRatePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ExcludedRateComponent,
        ExcludedRateDetailComponent,
        ExcludedRateDialogComponent,
        ExcludedRateDeleteDialogComponent,
        ExcludedRatePopupComponent,
        ExcludedRateDeletePopupComponent
    ],
    entryComponents: [
        ExcludedRateComponent,
        ExcludedRateDialogComponent,
        ExcludedRatePopupComponent,
        ExcludedRateDeleteDialogComponent,
        ExcludedRateDeletePopupComponent
    ],
    providers: [ExcludedRateService, ExcludedRatePopupService, ExcludedRateResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebExcludedRateModule {}
