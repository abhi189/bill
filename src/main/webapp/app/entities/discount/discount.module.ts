import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { BillingWebSharedModule } from '../../shared';
import {
    DiscountService,
    DiscountPopupService,
    DiscountComponent,
    DiscountDetailComponent,
    DiscountDialogComponent,
    DiscountPopupComponent,
    DiscountDeletePopupComponent,
    DiscountDeleteDialogComponent,
    DiscountDuplicatePopupComponent,
    DiscountDuplicateDialogComponent,
    discountRoute,
    discountPopupRoute,
    DiscountResolvePagingParams,
    DiscountChargesComponent,
    DiscountChargesService,
    DiscountSolutionComponent,
    DiscountSolutionService,
    DiscountAssociatedAgreementComponent,
    DiscountAssociatedAgreementService,
    DiscountValuesComponent,
    DiscountValuesService,
    DiscountSharedSavingsComponent,
    DiscountLateChargesComponent
} from './';

const ENTITY_STATES = [...discountRoute, ...discountPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, ReactiveFormsModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        DiscountComponent,
        DiscountDetailComponent,
        DiscountDialogComponent,
        DiscountDeleteDialogComponent,
        DiscountPopupComponent,
        DiscountDeletePopupComponent,
        DiscountDuplicatePopupComponent,
        DiscountDuplicateDialogComponent,
        DiscountChargesComponent,
        DiscountSolutionComponent,
        DiscountAssociatedAgreementComponent,
        DiscountValuesComponent,
        DiscountSharedSavingsComponent,
        DiscountLateChargesComponent
    ],
    entryComponents: [
        DiscountComponent,
        DiscountDialogComponent,
        DiscountPopupComponent,
        DiscountDeleteDialogComponent,
        DiscountDeletePopupComponent,
        DiscountDuplicatePopupComponent,
        DiscountDuplicateDialogComponent
    ],
    providers: [
        DiscountService,
        DiscountAssociatedAgreementService,
        DiscountChargesService,
        DiscountSolutionService,
        DiscountValuesService,
        DiscountPopupService,
        DiscountResolvePagingParams
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebDiscountModule {}
