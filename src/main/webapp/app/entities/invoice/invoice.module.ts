import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    InvoiceService,
    InvoicePopupService,
    InvoiceComponent,
    InvoiceDetailComponent,
    InvoiceDialogComponent,
    InvoicePopupComponent,
    InvoiceDeletePopupComponent,
    InvoiceDeleteDialogComponent,
    InvoiceChargesComponent,
    InvoiceConsumptionComponent,
    InvoiceMeterComponent,
    invoiceRoute,
    invoicePopupRoute,
    InvoiceResolvePagingParams,
    ExportInvoiceDialogComponent
} from './';

const ENTITY_STATES = [...invoiceRoute, ...invoicePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    exports: [InvoiceComponent],
    declarations: [
        InvoiceComponent,
        InvoiceDetailComponent,
        InvoiceDialogComponent,
        InvoiceDeleteDialogComponent,
        InvoicePopupComponent,
        InvoiceDeletePopupComponent,
        InvoiceChargesComponent,
        InvoiceConsumptionComponent,
        InvoiceMeterComponent,
        ExportInvoiceDialogComponent
    ],
    entryComponents: [
        InvoiceComponent,
        InvoiceDialogComponent,
        InvoicePopupComponent,
        InvoiceDeleteDialogComponent,
        InvoiceDeletePopupComponent,
        ExportInvoiceDialogComponent
    ],
    providers: [InvoiceService, InvoicePopupService, InvoiceResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebInvoiceModule {}
