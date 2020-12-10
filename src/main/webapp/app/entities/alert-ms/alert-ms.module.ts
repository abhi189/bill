import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    AlertMsService,
    AlertMsPopupService,
    AlertMsComponent,
    AlertMsDetailComponent,
    AlertMsDialogComponent,
    AlertMsPopupComponent,
    AlertMsDeletePopupComponent,
    AlertMsDeleteDialogComponent,
    alertMsRoute,
    alertMsPopupRoute,
    AlertMsResolvePagingParams,
    AlertNoteComponent,
    AlertActivityComponent
} from './';

import { MorrisJsModule } from 'angular-morris-js';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ChartsModule } from 'ng2-charts';

const ENTITY_STATES = [...alertMsRoute, ...alertMsPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES), MorrisJsModule, NgbModule, ChartsModule],
    declarations: [
        AlertMsComponent,
        AlertMsDetailComponent,
        AlertMsDialogComponent,
        AlertMsDeleteDialogComponent,
        AlertMsPopupComponent,
        AlertMsDeletePopupComponent,
        AlertNoteComponent,
        AlertActivityComponent
    ],
    entryComponents: [
        AlertMsComponent,
        AlertMsDialogComponent,
        AlertMsPopupComponent,
        AlertMsDeleteDialogComponent,
        AlertMsDeletePopupComponent,
        AlertNoteComponent,
        AlertActivityComponent
    ],
    providers: [AlertMsService, AlertMsPopupService, AlertMsResolvePagingParams],
    exports: [AlertMsComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebAlertMsModule {}
