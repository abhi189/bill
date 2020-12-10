import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AdjustmentComponent } from './adjustment.component';
import { AdjustmentDetailComponent } from './adjustment-detail.component';
import { AdjustmentPopupComponent } from './adjustment-dialog.component';
import { AdjustmentDeletePopupComponent } from './adjustment-delete-dialog.component';

@Injectable()
export class AdjustmentResolvePagingParams implements Resolve<any> {
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

export const adjustmentRoute: Routes = [
    {
        path: 'adjustment',
        component: AdjustmentComponent,
        resolve: {
            pagingParams: AdjustmentResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.adjustment.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'adjustment/:id',
        component: AdjustmentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.adjustment.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const adjustmentPopupRoute: Routes = [
    {
        path: 'adjustment-new',
        component: AdjustmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.adjustment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'adjustment/:id/edit',
        component: AdjustmentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.adjustment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'adjustment/:id/delete',
        component: AdjustmentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.adjustment.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
