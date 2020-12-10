import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import { ImportMappingComponent, importMappingRoute, ImportMappingResolvePagingParams } from './';

import { UtilityMappingRuleComponent } from '../utility-mapping-rule';
import { BillingWebUtilityMappingRuleModule } from '../utility-mapping-rule/utility-mapping-rule.module';
import { BillingWebTariffMappingRuleModule } from '../tariff-mapping-rule/tariff-mapping-rule.module';
import { BillingWebRateChargeMappingModule } from '../rate-charge-mapping/rate-charge-mapping.module';
import { BillingWebRateComponentMappingModule } from '../rate-component-mapping/rate-component-mapping.module';
import { BillingWebRateUsageTypeMappingModule } from '../rate-usage-type-mapping/rate-usage-type-mapping.module';

const ENTITY_STATES = [...importMappingRoute];

@NgModule({
    imports: [
        BillingWebSharedModule,
        RouterModule.forChild(ENTITY_STATES),
        BillingWebUtilityMappingRuleModule,
        BillingWebTariffMappingRuleModule,
        BillingWebRateChargeMappingModule,
        BillingWebRateComponentMappingModule,
        BillingWebRateUsageTypeMappingModule
    ],
    declarations: [ImportMappingComponent],
    entryComponents: [ImportMappingComponent, UtilityMappingRuleComponent],
    providers: [ImportMappingResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebImportMappingModule {}
