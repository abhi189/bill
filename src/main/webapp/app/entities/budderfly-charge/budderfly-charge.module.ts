import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import { BudderflyChargeService } from './budderfly-charge.service';

const ENTITY_STATES = [];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [],
    entryComponents: [],
    providers: [BudderflyChargeService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebBudderflyChargeModule {}
