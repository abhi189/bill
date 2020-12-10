import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { BillingWebSharedModule } from '../../shared';

import { AmeService } from './ame.service';

@NgModule({
    imports: [BillingWebSharedModule],
    declarations: [],
    entryComponents: [],
    providers: [AmeService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebSiteAmeModule {}
