import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    MissingInvoiceService,
    MissingInvoicePopupService,
    MissingInvoiceComponent,
    MissingInvoiceDetailComponent,
    MissingInvoiceDialogComponent,
    MissingInvoicePopupComponent,
    MissingInvoiceDeletePopupComponent,
    MissingInvoiceDeleteDialogComponent,
    missingInvoiceRoute,
    missingInvoicePopupRoute,
    MissingInvoiceResolvePagingParams
} from './';

const ENTITY_STATES = [...missingInvoiceRoute, ...missingInvoicePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        MissingInvoiceComponent,
        MissingInvoiceDetailComponent,
        MissingInvoiceDialogComponent,
        MissingInvoiceDeleteDialogComponent,
        MissingInvoicePopupComponent,
        MissingInvoiceDeletePopupComponent
    ],
    entryComponents: [
        MissingInvoiceComponent,
        MissingInvoiceDialogComponent,
        MissingInvoicePopupComponent,
        MissingInvoiceDeleteDialogComponent,
        MissingInvoiceDeletePopupComponent
    ],
    providers: [MissingInvoiceService, MissingInvoicePopupService, MissingInvoiceResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebMissingInvoiceModule {}
