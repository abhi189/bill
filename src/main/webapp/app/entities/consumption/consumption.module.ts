import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    ConsumptionService,
    ConsumptionPopupService,
    ConsumptionComponent,
    ConsumptionDetailComponent,
    ConsumptionDialogComponent,
    ConsumptionPopupComponent,
    ConsumptionDeletePopupComponent,
    ConsumptionDeleteDialogComponent,
    consumptionRoute,
    consumptionPopupRoute,
    ConsumptionResolvePagingParams
} from './';

const ENTITY_STATES = [...consumptionRoute, ...consumptionPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ConsumptionComponent,
        ConsumptionDetailComponent,
        ConsumptionDialogComponent,
        ConsumptionDeleteDialogComponent,
        ConsumptionPopupComponent,
        ConsumptionDeletePopupComponent
    ],
    entryComponents: [
        ConsumptionComponent,
        ConsumptionDialogComponent,
        ConsumptionPopupComponent,
        ConsumptionDeleteDialogComponent,
        ConsumptionDeletePopupComponent
    ],
    providers: [ConsumptionService, ConsumptionPopupService, ConsumptionResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebConsumptionModule {}
