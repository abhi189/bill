import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    AmuConfigurationService,
    AmuConfigurationPopupService,
    AmuConfigurationComponent,
    AmuConfigurationDetailComponent,
    AmuConfigurationDialogComponent,
    AmuConfigurationPopupComponent,
    AmuConfigurationDeletePopupComponent,
    AmuConfigurationDeleteDialogComponent,
    amuConfigurationRoute,
    amuConfigurationPopupRoute,
    AmuConfigurationResolvePagingParams
} from './';

const ENTITY_STATES = [...amuConfigurationRoute, ...amuConfigurationPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AmuConfigurationComponent,
        AmuConfigurationDetailComponent,
        AmuConfigurationDialogComponent,
        AmuConfigurationDeleteDialogComponent,
        AmuConfigurationPopupComponent,
        AmuConfigurationDeletePopupComponent
    ],
    entryComponents: [
        AmuConfigurationComponent,
        AmuConfigurationDialogComponent,
        AmuConfigurationPopupComponent,
        AmuConfigurationDeleteDialogComponent,
        AmuConfigurationDeletePopupComponent
    ],
    providers: [AmuConfigurationService, AmuConfigurationPopupService, AmuConfigurationResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebAmuConfigurationModule {}
