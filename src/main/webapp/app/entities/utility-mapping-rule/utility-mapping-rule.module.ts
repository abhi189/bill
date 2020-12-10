import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    UtilityMappingRuleService,
    UtilityMappingRulePopupService,
    UtilityMappingRuleComponent,
    UtilityMappingRuleJobTaskComponent,
    UtilityMappingRuleDetailComponent,
    UtilityMappingRuleDialogComponent,
    UtilityMappingRulePopupComponent,
    UtilityMappingRuleDeletePopupComponent,
    UtilityMappingRuleDeleteDialogComponent,
    utilityMappingRuleRoute,
    utilityMappingRulePopupRoute,
    UtilityMappingRuleResolvePagingParams
} from './';

const ENTITY_STATES = [...utilityMappingRuleRoute, ...utilityMappingRulePopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        UtilityMappingRuleComponent,
        UtilityMappingRuleJobTaskComponent,
        UtilityMappingRuleDetailComponent,
        UtilityMappingRuleDialogComponent,
        UtilityMappingRuleDeleteDialogComponent,
        UtilityMappingRulePopupComponent,
        UtilityMappingRuleDeletePopupComponent
    ],
    entryComponents: [
        UtilityMappingRuleComponent,
        UtilityMappingRuleJobTaskComponent,
        UtilityMappingRuleDialogComponent,
        UtilityMappingRulePopupComponent,
        UtilityMappingRuleDeleteDialogComponent,
        UtilityMappingRuleDeletePopupComponent
    ],
    providers: [UtilityMappingRuleService, UtilityMappingRulePopupService, UtilityMappingRuleResolvePagingParams],
    exports: [UtilityMappingRuleComponent, UtilityMappingRuleJobTaskComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebUtilityMappingRuleModule {}
