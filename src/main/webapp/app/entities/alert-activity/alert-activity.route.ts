import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AlertActivityComponent } from './alert-activity.component';
import { AlertActivityDetailComponent } from './alert-activity-detail.component';
import { AlertActivityPopupComponent } from './alert-activity-dialog.component';
import { AlertActivityDeletePopupComponent } from './alert-activity-delete-dialog.component';

@Injectable()
export class AlertActivityResolvePagingParams implements Resolve<any> {
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

export const alertActivityRoute: Routes = [
    {
        path: 'alert-activity',
        component: AlertActivityComponent,
        resolve: {
            pagingParams: AlertActivityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alert-activity/:id',
        component: AlertActivityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alertActivityPopupRoute: Routes = [
    {
        path: 'alert-activity-new',
        component: AlertActivityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert-activity/:id/edit',
        component: AlertActivityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert-activity/:id/delete',
        component: AlertActivityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
