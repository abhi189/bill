import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    TariffComponent,
    TariffDeleteDialogComponent,
    TariffDeletePopupComponent,
    TariffDetailComponent,
    TariffDialogComponent,
    TariffPopupComponent,
    tariffPopupRoute,
    TariffPopupService,
    TariffResolvePagingParams,
    tariffRoute,
    TariffService,
    RateImportJobComponent,
    RateImportService,
    TariffVersionHistoryComponent
} from './';
import { TariffRatesTableComponent } from './tariff-rates-table/tariff-rates-table.component';
import { TariffYearService } from './tariff-year.service';
import { TariffRatesMonthsPopupComponent } from './tariff-rates-table/tariff-rates-months-popup.component';
import { UtilityService } from '../utility';
import { NewYearRatesPopupComponent } from './tariff-rates-table/new-year-rates-popup.component';
import { NewYearRatesMessagePopupComponent } from './tariff-rates-table/new-year-rates-message-popup.component';
import { ProviderService } from './provider.service';
import { TariffVersionHistoryService } from './tariff-version-history/tariff-version-history.service';

const ENTITY_STATES = [...tariffRoute, ...tariffPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TariffComponent,
        TariffDetailComponent,
        TariffDialogComponent,
        TariffDeleteDialogComponent,
        TariffPopupComponent,
        TariffDeletePopupComponent,
        TariffRatesTableComponent,
        TariffRatesMonthsPopupComponent,
        NewYearRatesPopupComponent,
        NewYearRatesMessagePopupComponent,
        RateImportJobComponent,
        TariffVersionHistoryComponent
    ],
    entryComponents: [
        TariffComponent,
        TariffDialogComponent,
        TariffPopupComponent,
        TariffDeleteDialogComponent,
        TariffDeletePopupComponent,
        TariffRatesMonthsPopupComponent,
        NewYearRatesPopupComponent,
        NewYearRatesMessagePopupComponent
    ],
    providers: [
        TariffService,
        TariffPopupService,
        TariffResolvePagingParams,
        TariffYearService,
        UtilityService,
        RateImportService,
        ProviderService,
        TariffVersionHistoryService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebTariffModule {}
