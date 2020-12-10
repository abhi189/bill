import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BillingWebSharedModule } from '../../shared';
import {
    InventoryItemService,
    InventoryItemPopupService,
    InventoryItemComponent,
    InventoryItemDetailComponent,
    InventoryItemDialogComponent,
    InventoryItemPopupComponent,
    InventoryItemDeletePopupComponent,
    InventoryItemDeleteDialogComponent,
    inventoryItemRoute,
    inventoryItemPopupRoute,
    InventoryItemResolvePagingParams,
    InventoryItemConfigureComponent
} from './';
import { InventoryItemTypeService } from '../inventory-item-type/inventory-item-type.service';

const ENTITY_STATES = [...inventoryItemRoute, ...inventoryItemPopupRoute];

@NgModule({
    imports: [BillingWebSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        InventoryItemComponent,
        InventoryItemDetailComponent,
        InventoryItemDialogComponent,
        InventoryItemDeleteDialogComponent,
        InventoryItemPopupComponent,
        InventoryItemDeletePopupComponent,
        InventoryItemConfigureComponent
    ],
    entryComponents: [
        InventoryItemComponent,
        InventoryItemDialogComponent,
        InventoryItemPopupComponent,
        InventoryItemDeleteDialogComponent,
        InventoryItemDeletePopupComponent,
        InventoryItemConfigureComponent
    ],
    providers: [InventoryItemTypeService, InventoryItemService, InventoryItemPopupService, InventoryItemResolvePagingParams],
    exports: [InventoryItemComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BillingWebInventoryItemModule {}
