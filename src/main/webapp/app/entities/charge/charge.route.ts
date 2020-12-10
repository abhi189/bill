import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ChargeComponent } from './charge.component';
import { ChargeDetailComponent } from './charge-detail.component';
import { ChargePopupComponent } from './charge-dialog.component';
import { ChargeDeletePopupComponent } from './charge-delete-dialog.component';

@Injectable()
export class ChargeResolvePagingParams implements Resolve<any> {
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

export const chargeRoute: Routes = [
    {
        path: 'charge',
        component: ChargeComponent,
        resolve: {
            pagingParams: ChargeResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'charge/:id',
        component: ChargeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const chargePopupRoute: Routes = [
    {
        path: 'charge-new',
        component: ChargePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'charge/:id/edit',
        component: ChargePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'charge/:id/delete',
        component: ChargeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.charge.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
