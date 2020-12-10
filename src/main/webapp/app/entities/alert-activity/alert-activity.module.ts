import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    AlertActivityService,
    AlertActivityPopupService,
    AlertActivityComponent,
    AlertActivityDetailComponent,
    AlertActivityDialogComponent,
    AlertActivityPopupComponent,
    AlertActivityDeletePopupComponent,
    AlertActivityDeleteDialogComponent,
    alertActivityRoute,
    alertActivityPopupRoute,
    AlertActivityResolvePagingParams
} from './';

const ENTITY_STATES = [...alertActivityRoute, ...alertActivityPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AlertActivityComponent,
        AlertActivityDetailComponent,
        AlertActivityDialogComponent,
        AlertActivityDeleteDialogComponent,
        AlertActivityPopupComponent,
        AlertActivityDeletePopupComponent
    ],
    entryComponents: [
        AlertActivityComponent,
        AlertActivityDialogComponent,
        AlertActivityPopupComponent,
        AlertActivityDeleteDialogComponent,
        AlertActivityDeletePopupComponent
    ],
    providers: [AlertActivityService, AlertActivityPopupService, AlertActivityResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebAlertActivityModule {}
