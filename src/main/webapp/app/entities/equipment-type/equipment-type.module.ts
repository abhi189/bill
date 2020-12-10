import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    EquipmentTypeService,
    EquipmentTypePopupService,
    EquipmentTypeComponent,
    EquipmentTypeDetailComponent,
    EquipmentTypeDialogComponent,
    EquipmentTypePopupComponent,
    EquipmentTypeDeletePopupComponent,
    EquipmentTypeDeleteDialogComponent,
    equipmentTypeRoute,
    equipmentTypePopupRoute,
    EquipmentTypeResolvePagingParams
} from './';
import {
    EquipmentTypeLocationComponent,
    EquipmentTypeLocationService,
    EquipmentTypeLocationPopupService,
    EquipmentTypeLocationDialogComponent,
    EquipmentTypeLocationPopupComponent,
    EquipmentTypeLocationDeletePopupComponent,
    EquipmentTypeLocationDeleteDialogComponent,
    equipmentTypeLocationPopupRoute
} from './equipment-type-location/';

const ENTITY_STATES = [...equipmentTypeRoute, ...equipmentTypePopupRoute, ...equipmentTypeLocationPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EquipmentTypeComponent,
        EquipmentTypeDetailComponent,
        EquipmentTypeDialogComponent,
        EquipmentTypeDeleteDialogComponent,
        EquipmentTypePopupComponent,
        EquipmentTypeDeletePopupComponent,
        EquipmentTypeLocationComponent,
        EquipmentTypeLocationDialogComponent,
        EquipmentTypeLocationDeleteDialogComponent,
        EquipmentTypeLocationPopupComponent,
        EquipmentTypeLocationDeletePopupComponent
    ],
    entryComponents: [
        EquipmentTypeComponent,
        EquipmentTypeDialogComponent,
        EquipmentTypePopupComponent,
        EquipmentTypeDeleteDialogComponent,
        EquipmentTypeDeletePopupComponent,
        EquipmentTypeLocationComponent,
        EquipmentTypeLocationDialogComponent,
        EquipmentTypeLocationPopupComponent,
        EquipmentTypeLocationDeleteDialogComponent,
        EquipmentTypeLocationDeletePopupComponent
    ],
    providers: [
        EquipmentTypeService,
        EquipmentTypePopupService,
        EquipmentTypeResolvePagingParams,
        EquipmentTypeLocationService,
        EquipmentTypeLocationPopupService
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebEquipmentTypeModule {}
