import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../../shared';
import { EquipmentTypeLocationPopupComponent } from './equipment-type-location-dialog.component';
import { EquipmentTypeLocationDeletePopupComponent } from './equipment-type-location-delete-dialog.component';

export const equipmentTypeLocationPopupRoute: Routes = [
    {
        path: 'equipment-type-location-new/equipment-type-id/:equipmentTypeId',
        component: EquipmentTypeLocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.inventoryEquipmentTypeLocation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-type-location/:id/edit',
        component: EquipmentTypeLocationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.inventoryEquipmentTypeLocation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-type-location/:id/delete',
        component: EquipmentTypeLocationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.inventoryEquipmentTypeLocation.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
