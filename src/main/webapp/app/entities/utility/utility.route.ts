import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UtilityComponent } from './utility.component';
import { UtilityDetailComponent } from './utility-detail.component';
import { UtilityPopupComponent } from './utility-dialog.component';
import { UtilityDeletePopupComponent } from './utility-delete-dialog.component';

@Injectable()
export class UtilityResolvePagingParams implements Resolve<any> {
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

export const utilityRoute: Routes = [
    {
        path: 'utility',
        component: UtilityComponent,
        resolve: {
            pagingParams: UtilityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utility.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'utility/:id',
        component: UtilityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utility.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const utilityPopupRoute: Routes = [
    {
        path: 'utility-new',
        component: UtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utility.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utility/:id/edit',
        component: UtilityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utility.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utility/:id/delete',
        component: UtilityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utility.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
