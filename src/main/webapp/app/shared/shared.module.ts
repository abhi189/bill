import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
    BillingWebSharedLibsModule,
    BillingWebSharedCommonModule,
    CSRFService,
    AuthServerProvider,
    AccountService,
    UserService,
    StateStorageService,
    LoginService,
    LoginModalService,
    JhiLoginModalComponent,
    Principal,
    JhiTrackerService,
    HasAnyAuthorityDirective
} from './';
import { FeatureToggleService } from './feature-toggle/feature-toggle.service';

@NgModule({
    imports: [BillingWebSharedLibsModule, BillingWebSharedCommonModule],
    declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
    providers: [
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        JhiTrackerService,
        AuthServerProvider,
        UserService,
        DatePipe,
        FeatureToggleService
    ],
    entryComponents: [JhiLoginModalComponent],
    exports: [BillingWebSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective, DatePipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebSharedModule {}
