import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    TemplatesService,
    TemplatesPopupService,
    TemplatesComponent,
    TemplatesDetailComponent,
    TemplatesDialogComponent,
    TemplatesPopupComponent,
    TemplatesDeletePopupComponent,
    TemplatesDeleteDialogComponent,
    templatesRoute,
    templatesPopupRoute,
    TemplatesResolvePagingParams
} from './';

const ENTITY_STATES = [...templatesRoute, ...templatesPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TemplatesComponent,
        TemplatesDetailComponent,
        TemplatesDialogComponent,
        TemplatesDeleteDialogComponent,
        TemplatesPopupComponent,
        TemplatesDeletePopupComponent
    ],
    entryComponents: [
        TemplatesComponent,
        TemplatesDialogComponent,
        TemplatesPopupComponent,
        TemplatesDeleteDialogComponent,
        TemplatesDeletePopupComponent
    ],
    providers: [TemplatesService, TemplatesPopupService, TemplatesResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebTemplatesModule {}
