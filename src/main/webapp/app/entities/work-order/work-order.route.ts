import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { WorkOrderComponent } from './work-order.component';
import { WorkOrderDetailComponent } from './work-order-detail.component';
import { WorkOrderPopupComponent } from './work-order-dialog.component';
import { WorkOrderDeletePopupComponent } from './work-order-delete-dialog.component';

@Injectable()
export class WorkOrderResolvePagingParams implements Resolve<any> {
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

export const workOrderRoute: Routes = [
    {
        path: 'work-order',
        component: WorkOrderComponent,
        resolve: {
            pagingParams: WorkOrderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.workOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'work-order/:id',
        component: WorkOrderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.workOrder.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const workOrderPopupRoute: Routes = [
    {
        path: 'work-order-new',
        component: WorkOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.workOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-order/:id/edit',
        component: WorkOrderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.workOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'work-order/:id/delete',
        component: WorkOrderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.workOrder.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
