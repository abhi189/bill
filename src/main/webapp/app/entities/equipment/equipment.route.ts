import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { EquipmentComponent } from './equipment.component';
import { EquipmentDetailComponent } from './equipment-detail.component';
import { EquipmentPopupComponent } from './equipment-dialog.component';
import { EquipmentDeletePopupComponent } from './equipment-delete-dialog.component';

@Injectable()
export class EquipmentResolvePagingParams implements Resolve<any> {
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

export const equipmentRoute: Routes = [
    {
        path: 'equipment',
        component: EquipmentComponent,
        resolve: {
            pagingParams: EquipmentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.equipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'equipment/:id',
        component: EquipmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.equipment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const equipmentPopupRoute: Routes = [
    {
        path: 'equipment-new',
        component: EquipmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.equipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment/:id/edit',
        component: EquipmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.equipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'equipment/:id/delete',
        component: EquipmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.equipment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
