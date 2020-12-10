import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    StagingInvoiceService,
    StagingInvoicePopupService,
    StagingInvoiceComponent,
    StagingInvoiceDetailComponent,
    StagingInvoiceDialogComponent,
    StagingInvoicePopupComponent,
    StagingInvoiceDeletePopupComponent,
    StagingInvoiceDeleteDialogComponent,
    stagingInvoiceRoute,
    stagingInvoicePopupRoute
} from './';

const ENTITY_STATES = [...stagingInvoiceRoute, ...stagingInvoicePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        StagingInvoiceComponent,
        StagingInvoiceDetailComponent,
        StagingInvoiceDialogComponent,
        StagingInvoiceDeleteDialogComponent,
        StagingInvoicePopupComponent,
        StagingInvoiceDeletePopupComponent
    ],
    entryComponents: [
        StagingInvoiceComponent,
        StagingInvoiceDialogComponent,
        StagingInvoicePopupComponent,
        StagingInvoiceDeleteDialogComponent,
        StagingInvoiceDeletePopupComponent
    ],
    providers: [StagingInvoiceService, StagingInvoicePopupService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebStagingInvoiceModule {}
