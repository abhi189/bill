import './vendor.ts';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { PortalSharedModule } from 'app/shared';
import { PortalCoreModule } from 'app/core';
import { PortalAppRoutingModule } from './app-routing.module';
import { InvoicesModule } from './invoices/invoives.module';
import { ModulesModule } from './modules/modules.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PortalEntityModule } from './entities/entity.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import {
    JhiMainComponent,
    NavbarComponent,
    Four04Component,
    FooterComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';
import { MainService } from './layouts/main/main.service';

export function initializeApp(appInitService: MainService) {
    return () => {
        return appInitService.getLayout();
    };
}

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000,
            i18nEnabled: true,
            defaultI18nLang: 'en'
        }),
        PortalSharedModule.forRoot(),
        PortalCoreModule,
        ModulesModule,
        DashboardModule,
        InvoicesModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        PortalEntityModule,
        PortalAppRoutingModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        Four04Component
    ],
    providers: [
        MainService,
        {
            provide: APP_INITIALIZER,
            useFactory: initializeApp,
            deps: [MainService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PortalAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
