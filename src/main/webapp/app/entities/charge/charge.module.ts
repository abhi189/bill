import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    ChargeService,
    ChargePopupService,
    ChargeComponent,
    ChargeDetailComponent,
    ChargeDialogComponent,
    ChargePopupComponent,
    ChargeDeletePopupComponent,
    ChargeDeleteDialogComponent,
    chargeRoute,
    chargePopupRoute,
    ChargeResolvePagingParams
} from './';

const ENTITY_STATES = [...chargeRoute, ...chargePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ChargeComponent,
        ChargeDetailComponent,
        ChargeDialogComponent,
        ChargeDeleteDialogComponent,
        ChargePopupComponent,
        ChargeDeletePopupComponent
    ],
    entryComponents: [
        ChargeComponent,
        ChargeDialogComponent,
        ChargePopupComponent,
        ChargeDeleteDialogComponent,
        ChargeDeletePopupComponent
    ],
    providers: [ChargeService, ChargePopupService, ChargeResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebChargeModule {}
