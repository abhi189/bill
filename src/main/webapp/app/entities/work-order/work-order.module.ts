import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    WorkOrderService,
    WorkOrderPopupService,
    WorkOrderComponent,
    WorkOrderDetailComponent,
    WorkOrderDialogComponent,
    WorkOrderPopupComponent,
    WorkOrderDeletePopupComponent,
    WorkOrderDeleteDialogComponent,
    workOrderRoute,
    workOrderPopupRoute,
    WorkOrderResolvePagingParams
} from './';

const ENTITY_STATES = [...workOrderRoute, ...workOrderPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        WorkOrderComponent,
        WorkOrderDetailComponent,
        WorkOrderDialogComponent,
        WorkOrderDeleteDialogComponent,
        WorkOrderPopupComponent,
        WorkOrderDeletePopupComponent
    ],
    entryComponents: [
        WorkOrderComponent,
        WorkOrderDialogComponent,
        WorkOrderPopupComponent,
        WorkOrderDeleteDialogComponent,
        WorkOrderDeletePopupComponent
    ],
    providers: [WorkOrderService, WorkOrderPopupService, WorkOrderResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebWorkOrderModule {}
