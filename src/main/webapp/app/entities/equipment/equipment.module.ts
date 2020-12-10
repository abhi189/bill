import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    EquipmentService,
    EquipmentPopupService,
    EquipmentComponent,
    EquipmentDetailComponent,
    EquipmentDialogComponent,
    EquipmentPopupComponent,
    EquipmentDeletePopupComponent,
    EquipmentDeleteDialogComponent,
    equipmentRoute,
    equipmentPopupRoute,
    EquipmentResolvePagingParams
} from './';

const ENTITY_STATES = [...equipmentRoute, ...equipmentPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EquipmentComponent,
        EquipmentDetailComponent,
        EquipmentDialogComponent,
        EquipmentDeleteDialogComponent,
        EquipmentPopupComponent,
        EquipmentDeletePopupComponent
    ],
    entryComponents: [
        EquipmentComponent,
        EquipmentDialogComponent,
        EquipmentPopupComponent,
        EquipmentDeleteDialogComponent,
        EquipmentDeletePopupComponent
    ],
    providers: [EquipmentService, EquipmentPopupService, EquipmentResolvePagingParams],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebEquipmentModule {}
