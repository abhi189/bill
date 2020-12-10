import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    AlertService,
    AlertPopupService,
    AlertComponent,
    AlertDetailComponent,
    AlertDialogComponent,
    AlertPopupComponent,
    AlertDeletePopupComponent,
    AlertDeleteDialogComponent,
    alertRoute,
    alertPopupRoute,
    AlertResolvePagingParams
} from './';

const ENTITY_STATES = [...alertRoute, ...alertPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AlertComponent,
        AlertDetailComponent,
        AlertDialogComponent,
        AlertDeleteDialogComponent,
        AlertPopupComponent,
        AlertDeletePopupComponent
    ],
    entryComponents: [AlertComponent, AlertDialogComponent, AlertPopupComponent, AlertDeleteDialogComponent, AlertDeletePopupComponent],
    providers: [AlertService, AlertPopupService, AlertResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebAlertModule {}
