import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    InvoiceUploadService,
    InvoiceUploadPopupService,
    InvoiceUploadComponent,
    InvoiceUploadDialogComponent,
    InvoiceUploadPopupComponent,
    InvoiceUploadDeletePopupComponent,
    InvoiceUploadDeleteDialogComponent,
    invoiceUploadRoute,
    invoiceUploadPopupRoute,
    InvoiceUploadResolvePagingParams
} from './';
import { InvoiceUploadViewPopUpComponent } from './invoice-upload-view-popup.component';

const ENTITY_STATES = [...invoiceUploadRoute, ...invoiceUploadPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InvoiceUploadComponent,
        InvoiceUploadDialogComponent,
        InvoiceUploadDeleteDialogComponent,
        InvoiceUploadPopupComponent,
        InvoiceUploadDeletePopupComponent,
        InvoiceUploadViewPopUpComponent
    ],
    entryComponents: [
        InvoiceUploadComponent,
        InvoiceUploadDialogComponent,
        InvoiceUploadPopupComponent,
        InvoiceUploadDeleteDialogComponent,
        InvoiceUploadDeletePopupComponent,
        InvoiceUploadViewPopUpComponent
    ],
    providers: [InvoiceUploadService, InvoiceUploadPopupService, InvoiceUploadResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebInvoiceUploadModule {}
