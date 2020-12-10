import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    UtilityChargeConfigurationService,
    UtilityChargeConfigurationPopupService,
    UtilityChargeConfigurationComponent,
    UtilityChargeConfigurationDetailComponent,
    UtilityChargeConfigurationDialogComponent,
    UtilityChargeConfigurationPopupComponent,
    UtilityChargeConfigurationDeletePopupComponent,
    UtilityChargeConfigurationDeleteDialogComponent,
    utilityChargeConfigurationRoute,
    utilityChargeConfigurationPopupRoute,
    UtilityChargeConfigurationResolvePagingParams,
    ChargeUtilityChargeConfigurationComponent
} from './';

const ENTITY_STATES = [...utilityChargeConfigurationRoute, ...utilityChargeConfigurationPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UtilityChargeConfigurationComponent,
        UtilityChargeConfigurationDetailComponent,
        UtilityChargeConfigurationDialogComponent,
        UtilityChargeConfigurationDeleteDialogComponent,
        UtilityChargeConfigurationPopupComponent,
        UtilityChargeConfigurationDeletePopupComponent,
        ChargeUtilityChargeConfigurationComponent
    ],
    entryComponents: [
        UtilityChargeConfigurationComponent,
        UtilityChargeConfigurationDialogComponent,
        UtilityChargeConfigurationPopupComponent,
        UtilityChargeConfigurationDeleteDialogComponent,
        UtilityChargeConfigurationDeletePopupComponent,
        ChargeUtilityChargeConfigurationComponent
    ],
    providers: [UtilityChargeConfigurationService, UtilityChargeConfigurationPopupService, UtilityChargeConfigurationResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebUtilityChargeConfigurationModule {}
