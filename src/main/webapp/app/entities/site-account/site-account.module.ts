import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MorrisJsModule } from 'angular-morris-js';
import { AngularMultiSelectModule } from 'angular4-multiselect-dropdown/angular4-multiselect-dropdown';

import { BillingWebSharedModule } from '../../shared';
import { BillingWebInvoiceModule } from '../invoice/invoice.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
    SiteAccountService,
    SiteAccountPopupService,
    SiteAccountComponent,
    SiteAccountDetailComponent,
    SiteAccountBillingTableComponent,
    SiteAccountInvoicesComponent,
    SiteAccountDialogComponent,
    SiteAccountPopupComponent,
    SiteAccountDeletePopupComponent,
    SiteAccountDeleteDialogComponent,
    siteAccountRoute,
    siteAccountPopupRoute,
    SiteAccountResolvePagingParams,
    SiteAccountAmeCalculationPopupComponent,
    SiteAccountComboSelectorPopupComponent,
    SiteAccountAmeDeletePopupComponent,
    SiteAccountAmeDeleteStatusCanceledComponent,
    SiteAccountApproveAmePopupComponent,
    SiteAccountRejectAmePopupComponent,
    SiteAccountAmeAlertsComponent,
    AmeAlertsService,
    SiteAccountAmeInvoicesComponent,
    AmeInvoicesService,
    SiteAccountAmeAmunComponent,
    AmunService,
    SiteAccountAmeAmuComponent,
    AmuService,
    SiteAccountAmeRatesComponent,
    AmeRatesService,
    SiteAccountAmeActivitiesComponent,
    AmeActivitiesService,
    SiteAccountPerformanceComponent
} from './';
import { SeteAccountAmeNotRejectedComponent } from './site-account-ame-not-rejected.component';
import { MissingBfidComponent } from './missing-bfid/missing-bfid.component';
import { SiteAccountTariffRatesComponent } from './site-account-tariff/site-account-tariff-rates.component';
import { SiteAccountTariffService } from './site-account-tariff/site-account-tariff.service';
import { RateService } from '../tariff/rates.service';
import { ExcludedPassthroughService } from '../excluded-passthrough/excluded-passthrough.service';

const ENTITY_STATES = [...siteAccountRoute, ...siteAccountPopupRoute];

@NgModule({
    imports: [
        BillingWebSharedModule,
        BillingWebInvoiceModule,
        MorrisJsModule,
        NgbModule,
        AngularMultiSelectModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        SiteAccountComponent,
        SiteAccountDetailComponent,
        SiteAccountBillingTableComponent,
        SiteAccountInvoicesComponent,
        SiteAccountDialogComponent,
        SiteAccountDeleteDialogComponent,
        SiteAccountPopupComponent,
        SiteAccountDeletePopupComponent,
        SiteAccountAmeCalculationPopupComponent,
        SiteAccountComboSelectorPopupComponent,
        SiteAccountAmeDeletePopupComponent,
        SiteAccountPerformanceComponent,
        SiteAccountAmeDeleteStatusCanceledComponent,
        SiteAccountApproveAmePopupComponent,
        SiteAccountRejectAmePopupComponent,
        SeteAccountAmeNotRejectedComponent,
        MissingBfidComponent,
        SiteAccountTariffRatesComponent,
        SiteAccountAmeAlertsComponent,
        SiteAccountAmeInvoicesComponent,
        SiteAccountAmeAmunComponent,
        SiteAccountAmeAmuComponent,
        SiteAccountAmeRatesComponent,
        SiteAccountAmeActivitiesComponent
    ],
    entryComponents: [
        SiteAccountComponent,
        SiteAccountDialogComponent,
        SiteAccountPopupComponent,
        SiteAccountDeleteDialogComponent,
        SiteAccountDeletePopupComponent,
        SiteAccountAmeCalculationPopupComponent,
        SiteAccountComboSelectorPopupComponent,
        SiteAccountAmeDeletePopupComponent,
        SiteAccountAmeDeleteStatusCanceledComponent,
        SiteAccountApproveAmePopupComponent,
        SiteAccountRejectAmePopupComponent,
        SeteAccountAmeNotRejectedComponent,
        MissingBfidComponent
    ],
    providers: [
        SiteAccountService,
        SiteAccountPopupService,
        SiteAccountResolvePagingParams,
        SiteAccountTariffService,
        AmeAlertsService,
        AmeInvoicesService,
        AmunService,
        RateService,
        AmuService,
        AmeRatesService,
        AmeActivitiesService,
        ExcludedPassthroughService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebSiteAccountModule {}
