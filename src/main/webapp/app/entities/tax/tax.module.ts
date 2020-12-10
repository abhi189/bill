import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    TaxService,
    TaxPopupService,
    TaxComponent,
    TaxDetailComponent,
    TaxDialogComponent,
    TaxPopupComponent,
    TaxDeletePopupComponent,
    TaxDeleteDialogComponent,
    taxRoute,
    taxPopupRoute,
    TaxResolvePagingParams
} from './';

const ENTITY_STATES = [...taxRoute, ...taxPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TaxComponent,
        TaxDetailComponent,
        TaxDialogComponent,
        TaxDeleteDialogComponent,
        TaxPopupComponent,
        TaxDeletePopupComponent
    ],
    entryComponents: [TaxComponent, TaxDialogComponent, TaxPopupComponent, TaxDeleteDialogComponent, TaxDeletePopupComponent],
    providers: [TaxService, TaxPopupService, TaxResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebTaxModule {}
