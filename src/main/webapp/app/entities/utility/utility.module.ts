import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    UtilityService,
    UtilityPopupService,
    UtilityComponent,
    UtilityDetailComponent,
    UtilityDialogComponent,
    UtilityPopupComponent,
    UtilityDeletePopupComponent,
    UtilityDeleteDialogComponent,
    utilityRoute,
    utilityPopupRoute,
    UtilityResolvePagingParams
} from './';

const ENTITY_STATES = [...utilityRoute, ...utilityPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UtilityComponent,
        UtilityDetailComponent,
        UtilityDialogComponent,
        UtilityDeleteDialogComponent,
        UtilityPopupComponent,
        UtilityDeletePopupComponent
    ],
    entryComponents: [
        UtilityComponent,
        UtilityDialogComponent,
        UtilityPopupComponent,
        UtilityDeleteDialogComponent,
        UtilityDeletePopupComponent
    ],
    providers: [UtilityService, UtilityPopupService, UtilityResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebUtilityModule {}
