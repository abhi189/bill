import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    TariffNameService,
    TariffNamePopupService,
    TariffNameComponent,
    TariffNameDetailComponent,
    TariffNameDialogComponent,
    TariffNamePopupComponent,
    TariffNameDeletePopupComponent,
    TariffNameDeleteDialogComponent,
    tariffNameRoute,
    tariffNamePopupRoute,
    TariffNameResolvePagingParams
} from './';

const ENTITY_STATES = [...tariffNameRoute, ...tariffNamePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TariffNameComponent,
        TariffNameDetailComponent,
        TariffNameDialogComponent,
        TariffNameDeleteDialogComponent,
        TariffNamePopupComponent,
        TariffNameDeletePopupComponent
    ],
    entryComponents: [
        TariffNameComponent,
        TariffNameDialogComponent,
        TariffNamePopupComponent,
        TariffNameDeleteDialogComponent,
        TariffNameDeletePopupComponent
    ],
    providers: [TariffNameService, TariffNamePopupService, TariffNameResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebTariffNameModule {}
