import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AlertComponent } from './alert.component';
import { AlertDetailComponent } from './alert-detail.component';
import { AlertPopupComponent } from './alert-dialog.component';
import { AlertDeletePopupComponent } from './alert-delete-dialog.component';

@Injectable()
export class AlertResolvePagingParams implements Resolve<any> {
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

export const alertRoute: Routes = [
    {
        path: 'alert',
        component: AlertComponent,
        resolve: {
            pagingParams: AlertResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alert.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alert/:id',
        component: AlertDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alert.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alertPopupRoute: Routes = [
    {
        path: 'alert-new',
        component: AlertPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert/:id/edit',
        component: AlertPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert/:id/delete',
        component: AlertDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alert.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
