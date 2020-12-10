import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BillingWebSiteAccountModule } from './site-account/site-account.module';
import { BillingWebInvoiceModule } from './invoice/invoice.module';
import { BillingWebChargeModule } from './charge/charge.module';
import { BillingWebConsumptionModule } from './consumption/consumption.module';
import { BillingWebAlertModule } from './alert/alert.module';
import { BillingWebJobHistoryModule } from './job-history/job-history.module';
import { BillingWebSiteAmeModule } from './ame/ame.module';
import { BillingWebJobExecutionAuditLogModule } from './job-execution-audit-log/job-execution-audit-log.module';
import { BillingWebTaxModule } from './tax/tax.module';
import { BillingWebAmuConfigurationModule } from './amu-configuration/amu-configuration.module';
import { BillingWebExcludedRateModule } from './excluded-rate/excluded-rate.module';
import { BillingWebStagingInvoiceModule } from './staging-invoice/staging-invoice.module';
import { BillingWebStagingMeterModule } from './staging-meter/staging-meter.module';
import { BillingWebStagingConsumptionModule } from './staging-consumption/staging-consumption.module';
import { BillingWebStagingChargeModule } from './staging-charge/staging-charge.module';
import { BillingWebSiteModule } from './site/site.module';
import { BillingWebBillingCycleModule } from './billing-cycle/billing-cycle.module';
import { BillingWebBudderflyInvoiceModule } from './budderfly-invoice/budderfly-invoice.module';
import { BillingWebWebhookEventLoggerModule } from './webhook-event-logger/webhook-event-logger.module';
import { BillingWebDataRetentionModule } from './data-retention/data-retention.module';
import { BillingWebBillingCycleActivityModule } from './billing-cycle-activity/billing-cycle-activity.module';
import { BillingWebBillingCycleInvoiceActivityModule } from './billing-cycle-invoice-activity/billing-cycle-invoice-activity.module';
import { BillingWebSolutionModule } from './solution/solution.module';
import { BillingWebBudderflyChargeModule } from './budderfly-charge/budderfly-charge.module';
import { BillingWebMissingInvoiceModule } from './missing-invoice/missing-invoice.module';
import { BillingWebDiscountModule } from './discount/discount.module';
import { BillingWebAdjustmentModule } from './adjustment/adjustment.module';
import { BillingWebAccountsReceivableModule } from './accounts-receivable/accounts-receivable.module';
import { BillingWebBudderflyInvoiceDiscountModule } from './budderfly-invoice-discount/budderfly-invoice-discount.module';
import { BillingWebInventoryItemModule } from './inventory-item/inventory-item.module';
import { BillingWebTariffModule } from './tariff/tariff.module';
import { BillingWebPerformanceModule } from './performance/performance.module';
import { BillingWebUtilityChargeConfigurationModule } from './utility-charge-configuration/utility-charge-configuration.module';
import { BillingWebMeterModule } from './meter/meter.module';
import { BillingWebUtilityModule } from './utility/utility.module';
import { BillingWebExpectedSavingsModule } from './expected-savings/expected-savings.module';
import { BillingWebTemplatesModule } from './templates/templates.module';
import { BillingWebEquipmentModule } from './equipment/equipment.module';
import { BillingWebEventModule } from './event/event.module';
import { BillingWebAlertMsModule } from './alert-ms/alert-ms.module';
import { BillingWebAlertNoteModule } from './alert-note/alert-note.module';
import { BillingWebAlertActivityModule } from './alert-activity/alert-activity.module';
import { BillingWebInvoiceUploadModule } from './invoice-upload/invoice-upload.module';
import { BillingWebContactModule } from './contact/contact.module';
import { BillingWebBudderflyInvoiceValidationModule } from './budderfly-invoice-validation/budderfly-invoice-validation.module';
import { BillingWebIotModule } from './iot/iot.module';
import { BillingWebWorkOrderModule } from './work-order/work-order.module';
import { BillingWebEquipmentTypeModule } from './equipment-type/equipment-type.module';
import { BillingWebProviderModule } from './provider/provider.module';
import { BillingWebRateChargeMappingModule } from './rate-charge-mapping/rate-charge-mapping.module';
import { BillingWebRateComponentMappingModule } from './rate-component-mapping/rate-component-mapping.module';
import { BillingWebRateUsageTypeMappingModule } from './rate-usage-type-mapping/rate-usage-type-mapping.module';
import { BillingWebUtilityMappingRuleModule } from './utility-mapping-rule/utility-mapping-rule.module';
import { BillingWebTariffMappingRuleModule } from './tariff-mapping-rule/tariff-mapping-rule.module';
import { BillingWebNoticeReportModule } from './notice-report/notice-report.module';
import { BillingWebTariffNameModule } from './tariff-name/tariff-name.module';
import { BillingWebImportMappingModule } from './import-mapping/import-mapping.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        BillingWebSiteAmeModule,
        BillingWebSiteAccountModule,
        BillingWebInvoiceModule,
        BillingWebChargeModule,
        BillingWebConsumptionModule,
        BillingWebAlertModule,
        BillingWebJobHistoryModule,
        BillingWebJobExecutionAuditLogModule,
        BillingWebTaxModule,
        BillingWebAmuConfigurationModule,
        BillingWebExcludedRateModule,
        BillingWebStagingInvoiceModule,
        BillingWebStagingMeterModule,
        BillingWebStagingConsumptionModule,
        BillingWebStagingChargeModule,
        BillingWebSiteModule,
        BillingWebBillingCycleModule,
        BillingWebBudderflyInvoiceModule,
        BillingWebWebhookEventLoggerModule,
        BillingWebDataRetentionModule,
        BillingWebBillingCycleActivityModule,
        BillingWebBillingCycleInvoiceActivityModule,
        BillingWebBudderflyChargeModule,
        BillingWebSolutionModule,
        BillingWebMissingInvoiceModule,
        BillingWebDiscountModule,
        BillingWebAdjustmentModule,
        BillingWebAccountsReceivableModule,
        BillingWebBudderflyInvoiceDiscountModule,
        BillingWebInventoryItemModule,
        BillingWebPerformanceModule,
        BillingWebTariffModule,
        BillingWebUtilityChargeConfigurationModule,
        BillingWebMeterModule,
        BillingWebUtilityModule,
        BillingWebExpectedSavingsModule,
        BillingWebTemplatesModule,
        BillingWebEquipmentModule,
        BillingWebEventModule,
        BillingWebAlertMsModule,
        BillingWebAlertNoteModule,
        BillingWebAlertActivityModule,
        BillingWebInvoiceUploadModule,
        BillingWebContactModule,
        BillingWebBudderflyInvoiceValidationModule,
        BillingWebIotModule,
        BillingWebWorkOrderModule,
        BillingWebEquipmentTypeModule,
        BillingWebProviderModule,
        BillingWebRateChargeMappingModule,
        BillingWebRateComponentMappingModule,
        BillingWebRateUsageTypeMappingModule,
        BillingWebUtilityMappingRuleModule,
        BillingWebTariffMappingRuleModule,
        BillingWebNoticeReportModule,
        BillingWebTariffNameModule,
        BillingWebImportMappingModule
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebEntityModule {}
