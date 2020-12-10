import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    BudderflyInvoiceComponent,
    BudderflyInvoiceDeleteDialogComponent,
    BudderflyInvoiceDeletePopupComponent,
    BudderflyInvoiceDetailComponent,
    BudderflyInvoiceDialogComponent,
    BudderflyInvoicePopupComponent,
    budderflyInvoicePopupRoute,
    BudderflyInvoicePopupService,
    BudderflyInvoiceResolvePagingParams,
    budderflyInvoiceRoute,
    BudderflyInvoiceService,
    InvoiceGenerationService
} from './';
import { BillingWebBillingCycleInvoiceActivityModule } from '../billing-cycle-invoice-activity/billing-cycle-invoice-activity.module';
import { AddSitesDialogComponent, AddSitesPopupComponent } from './add-sites.component';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/dist/multiselect.component';
import { BudderflyInvoiceEmailDialogComponent } from './budderfly-invoice-email-dialog.component';
import { BudderflyInvoiceConfirmationMessagePopupComponent } from './budderfly-invoice-confirmation-message-popup.component';
import { AutoApprovalTestsComponent } from './auto-approval-tests/auto-approval-tests.component';
import { BudderflyInvoiceValidationService } from './auto-approval-tests/auto-approval-tests.service';

const ENTITY_STATES = [...budderflyInvoiceRoute, ...budderflyInvoicePopupRoute];

@NgModule({
    imports: [
        BillingWebBillingCycleInvoiceActivityModule,
        BillingWebSharedModule,
        AngularMultiSelectModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BudderflyInvoiceComponent,
        BudderflyInvoiceDetailComponent,
        BudderflyInvoiceDialogComponent,
        BudderflyInvoiceDeleteDialogComponent,
        BudderflyInvoicePopupComponent,
        BudderflyInvoiceDeletePopupComponent,
        BudderflyInvoiceEmailDialogComponent,
        AddSitesPopupComponent,
        AddSitesDialogComponent,
        BudderflyInvoiceConfirmationMessagePopupComponent,
        AutoApprovalTestsComponent
    ],
    entryComponents: [
        BudderflyInvoiceComponent,
        BudderflyInvoiceDialogComponent,
        BudderflyInvoicePopupComponent,
        BudderflyInvoiceDeleteDialogComponent,
        BudderflyInvoiceDeletePopupComponent,
        BudderflyInvoiceEmailDialogComponent,
        AddSitesPopupComponent,
        AddSitesDialogComponent,
        BudderflyInvoiceConfirmationMessagePopupComponent,
        AutoApprovalTestsComponent
    ],
    providers: [
        BudderflyInvoiceService,
        InvoiceGenerationService,
        BudderflyInvoicePopupService,
        BudderflyInvoiceResolvePagingParams,
        BudderflyInvoiceValidationService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebBudderflyInvoiceModule {}
