import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import { BillingWebInventoryItemModule } from '../inventory-item';

import {
    SiteService,
    SitePopupService,
    SiteDiscountPopupService,
    SiteComponent,
    SiteDetailComponent,
    SiteDialogComponent,
    SiteDiscountDialogComponent,
    SitePopupComponent,
    SiteDiscountPopupComponent,
    SiteDeletePopupComponent,
    SiteDeleteDialogComponent,
    SiteDiscountDeletePopupComponent,
    SiteDiscountDeleteDialogComponent,
    siteRoute,
    sitePopupRoute,
    siteDiscountPopupRoute,
    SiteResolvePagingParams,
    SiteBudderflyInvoicesComponent,
    SiteEquipmentsComponent,
    SiteContactComponent,
    SiteWorkOrderComponent,
    SiteWorkOrderService,
    SiteConfigurationsComponent,
    SiteConfigurationsService
} from './';
import { ExcelService } from '../../shared/service/excel.service';
import { BillingWebAlertMsModule } from '../alert-ms';
import { SiteACHDeleteDialogComponent } from './site-ACH-delete-dialog.component';

import { ChartsModule } from 'ng2-charts';
import { MetricsService } from './metrics.service';
import { MonitorService } from './monitor.service';
import { MetricsCacheService } from './metrics-cache.service';
import { RefrigerationCacheService } from './refrigeration-cache.service';
import { SiteEquipmentHeaderComponent } from './site-equipment-header.component';

const ENTITY_STATES = [...siteRoute, ...sitePopupRoute, ...siteDiscountPopupRoute];

@NgModule({
    imports: [
        BillingWebSharedModule,
        BillingWebInventoryItemModule,
        BillingWebAlertMsModule,
        RouterModule.forChild(ENTITY_STATES),
        ChartsModule
    ],
    declarations: [
        SiteComponent,
        SiteDetailComponent,
        SiteDialogComponent,
        SiteDiscountDialogComponent,
        SiteDeleteDialogComponent,
        SiteDiscountDeleteDialogComponent,
        SitePopupComponent,
        SiteDiscountPopupComponent,
        SiteDeletePopupComponent,
        SiteDiscountDeletePopupComponent,
        SiteBudderflyInvoicesComponent,
        SiteEquipmentsComponent,
        SiteContactComponent,
        SiteACHDeleteDialogComponent,
        SiteWorkOrderComponent,
        SiteConfigurationsComponent,
        SiteEquipmentHeaderComponent
    ],
    entryComponents: [
        SiteComponent,
        SiteDialogComponent,
        SiteDiscountDialogComponent,
        SitePopupComponent,
        SiteDiscountPopupComponent,
        SiteDeleteDialogComponent,
        SiteDeletePopupComponent,
        SiteDiscountDeleteDialogComponent,
        SiteDiscountDeletePopupComponent,
        SiteBudderflyInvoicesComponent,
        SiteEquipmentsComponent,
        SiteContactComponent,
        SiteACHDeleteDialogComponent
    ],
    providers: [
        SiteService,
        SitePopupService,
        SiteDiscountPopupService,
        SiteResolvePagingParams,
        ExcelService,
        MetricsService,
        MonitorService,
        MetricsCacheService,
        RefrigerationCacheService,
        SiteWorkOrderService,
        SiteConfigurationsService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebSiteModule {}
