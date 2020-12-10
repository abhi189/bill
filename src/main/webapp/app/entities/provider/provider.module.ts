import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    ProviderService,
    ProviderPopupService,
    ProviderComponent,
    ProviderDetailComponent,
    ProviderDialogComponent,
    ProviderPopupComponent,
    ProviderDeletePopupComponent,
    ProviderDeleteDialogComponent,
    providerRoute,
    providerPopupRoute,
    ProviderResolvePagingParams
} from './';

const ENTITY_STATES = [...providerRoute, ...providerPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ProviderComponent,
        ProviderDetailComponent,
        ProviderDialogComponent,
        ProviderDeleteDialogComponent,
        ProviderPopupComponent,
        ProviderDeletePopupComponent
    ],
    entryComponents: [
        ProviderComponent,
        ProviderDialogComponent,
        ProviderPopupComponent,
        ProviderDeleteDialogComponent,
        ProviderDeletePopupComponent
    ],
    providers: [ProviderService, ProviderPopupService, ProviderResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebProviderModule {}
