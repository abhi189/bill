import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    PerformanceService,
    PerformancePopupService,
    PerformanceComponent,
    PerformanceDetailComponent,
    PerformanceDialogComponent,
    PerformancePopupComponent,
    PerformanceDeletePopupComponent,
    PerformanceDeleteDialogComponent,
    performanceRoute,
    performancePopupRoute,
    PerformanceResolvePagingParams
} from './';

const ENTITY_STATES = [...performanceRoute, ...performancePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        PerformanceComponent,
        PerformanceDetailComponent,
        PerformanceDialogComponent,
        PerformanceDeleteDialogComponent,
        PerformancePopupComponent,
        PerformanceDeletePopupComponent
    ],
    entryComponents: [
        PerformanceComponent,
        PerformanceDialogComponent,
        PerformancePopupComponent,
        PerformanceDeleteDialogComponent,
        PerformanceDeletePopupComponent
    ],
    providers: [PerformanceService, PerformancePopupService, PerformanceResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebPerformanceModule {}
