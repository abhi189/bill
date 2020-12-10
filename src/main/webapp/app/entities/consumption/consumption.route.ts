import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ConsumptionComponent } from './consumption.component';
import { ConsumptionDetailComponent } from './consumption-detail.component';
import { ConsumptionPopupComponent } from './consumption-dialog.component';
import { ConsumptionDeletePopupComponent } from './consumption-delete-dialog.component';

@Injectable()
export class ConsumptionResolvePagingParams implements Resolve<any> {
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

export const consumptionRoute: Routes = [
    {
        path: 'consumption',
        component: ConsumptionComponent,
        resolve: {
            pagingParams: ConsumptionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'consumption/:id',
        component: ConsumptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const consumptionPopupRoute: Routes = [
    {
        path: 'consumption-new',
        component: ConsumptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'consumption/:id/edit',
        component: ConsumptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'consumption/:id/delete',
        component: ConsumptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.consumption.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
