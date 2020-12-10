import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ExcludedRateComponent } from './excluded-rate.component';
import { ExcludedRateDetailComponent } from './excluded-rate-detail.component';
import { ExcludedRatePopupComponent } from './excluded-rate-dialog.component';
import { ExcludedRateDeletePopupComponent } from './excluded-rate-delete-dialog.component';

@Injectable()
export class ExcludedRateResolvePagingParams implements Resolve<any> {
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

export const excludedRateRoute: Routes = [
    {
        path: 'excluded-rate',
        component: ExcludedRateComponent,
        resolve: {
            pagingParams: ExcludedRateResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.excludedRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'excluded-rate/:id',
        component: ExcludedRateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.excludedRate.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const excludedRatePopupRoute: Routes = [
    {
        path: 'excluded-rate-new',
        component: ExcludedRatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.excludedRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'excluded-rate/:id/edit',
        component: ExcludedRatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.excludedRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'excluded-rate/:id/delete',
        component: ExcludedRateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.excludedRate.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
