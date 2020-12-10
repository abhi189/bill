import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EquipmentTypeComponent } from './equipment-type.component';
import { EquipmentTypeDetailComponent } from './equipment-type-detail.component';
import { EquipmentTypePopupComponent } from './equipment-type-dialog.component';
import { EquipmentTypeDeletePopupComponent } from './equipment-type-delete-dialog.component';

@Injectable()
export class EquipmentTypeResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const equipmentTypeRoute: Routes = [
    {
        path: 'equipment-type',
        component: EquipmentTypeComponent,
        resolve: {
            pagingParams: EquipmentTypeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_IOT_ADMIN'],
            pageTitle: 'billingWebApp.inventoryEquipmentType.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'equipment-type/:id',
        component: EquipmentTypeDetailComponent,
        data: {
            authorities: ['ROLE_IOT_ADMIN'],
            pageTitle: 'billingWebApp.inventoryEquipmentType.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const equipmentTypePopupRoute: Routes = [
    {
        path: 'equipment-type-new',
        component: EquipmentTypePopupComponent,
        data: {
            authorities: ['ROLE_IOT_ADMIN'],
            pageTitle: 'billingWebApp.inventoryEquipmentType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-type/:id/edit',
        component: EquipmentTypePopupComponent,
        data: {
            authorities: ['ROLE_IOT_ADMIN'],
            pageTitle: 'billingWebApp.inventoryEquipmentType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment-type/:id/delete',
        component: EquipmentTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_IOT_ADMIN'],
            pageTitle: 'billingWebApp.inventoryEquipmentType.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
