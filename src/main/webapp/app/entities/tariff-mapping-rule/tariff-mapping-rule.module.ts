import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    TariffMappingRuleService,
    TariffMappingRulePopupService,
    TariffMappingRuleComponent,
    TariffMappingRuleJobTaskComponent,
    TariffMappingRuleDetailComponent,
    TariffMappingRuleDialogComponent,
    TariffMappingRulePopupComponent,
    TariffMappingRuleDeletePopupComponent,
    TariffMappingRuleDeleteDialogComponent,
    tariffMappingRuleRoute,
    tariffMappingRulePopupRoute,
    TariffMappingRuleResolvePagingParams
} from './';

const ENTITY_STATES = [...tariffMappingRuleRoute, ...tariffMappingRulePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TariffMappingRuleComponent,
        TariffMappingRuleJobTaskComponent,
        TariffMappingRuleDetailComponent,
        TariffMappingRuleDialogComponent,
        TariffMappingRuleDeleteDialogComponent,
        TariffMappingRulePopupComponent,
        TariffMappingRuleDeletePopupComponent
    ],
    entryComponents: [
        TariffMappingRuleComponent,
        TariffMappingRuleJobTaskComponent,
        TariffMappingRuleDialogComponent,
        TariffMappingRulePopupComponent,
        TariffMappingRuleDeleteDialogComponent,
        TariffMappingRuleDeletePopupComponent
    ],
    providers: [TariffMappingRuleService, TariffMappingRulePopupService, TariffMappingRuleResolvePagingParams],
    exports: [TariffMappingRuleComponent, TariffMappingRuleJobTaskComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebTariffMappingRuleModule {}
