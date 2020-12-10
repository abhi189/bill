import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    AccountsReceivableService,
    AccountsReceivablePopupService,
    AccountsReceivableComponent,
    AccountsReceivableDetailComponent,
    AccountsReceivableDialogComponent,
    AccountsReceivablePopupComponent,
    AccountsReceivableDeletePopupComponent,
    AccountsReceivableDeleteDialogComponent,
    accountsReceivableRoute,
    accountsReceivablePopupRoute,
    AccountsReceivableResolvePagingParams
} from './';

const ENTITY_STATES = [...accountsReceivableRoute, ...accountsReceivablePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AccountsReceivableComponent,
        AccountsReceivableDetailComponent,
        AccountsReceivableDialogComponent,
        AccountsReceivableDeleteDialogComponent,
        AccountsReceivablePopupComponent,
        AccountsReceivableDeletePopupComponent
    ],
    entryComponents: [
        AccountsReceivableComponent,
        AccountsReceivableDialogComponent,
        AccountsReceivablePopupComponent,
        AccountsReceivableDeleteDialogComponent,
        AccountsReceivableDeletePopupComponent
    ],
    providers: [AccountsReceivableService, AccountsReceivablePopupService, AccountsReceivableResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebAccountsReceivableModule {}
