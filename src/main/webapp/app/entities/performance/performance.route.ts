import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { PerformanceComponent } from './performance.component';
import { PerformanceDetailComponent } from './performance-detail.component';
import { PerformancePopupComponent } from './performance-dialog.component';
import { PerformanceDeletePopupComponent } from './performance-delete-dialog.component';

@Injectable()
export class PerformanceResolvePagingParams implements Resolve<any> {
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

export const performanceRoute: Routes = [
    {
        path: 'performance',
        component: PerformanceComponent,
        resolve: {
            pagingParams: PerformanceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.performance.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'performance/:id',
        component: PerformanceDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.performance.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const performancePopupRoute: Routes = [
    {
        path: 'performance-new',
        component: PerformancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.performance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'performance/:id/edit',
        component: PerformancePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.performance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'performance/:id/delete',
        component: PerformanceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.performance.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
