import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BillingCycleActivityComponent } from './billing-cycle-activity.component';
import { BillingCycleActivityDetailComponent } from './billing-cycle-activity-detail.component';
import { BillingCycleActivityPopupComponent } from './billing-cycle-activity-dialog.component';
import { BillingCycleActivityDeletePopupComponent } from './billing-cycle-activity-delete-dialog.component';
import { BillingCycleDetailComponent } from '../billing-cycle/billing-cycle-detail.component';

@Injectable()
export class BillingCycleActivityResolvePagingParams implements Resolve<any> {
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

export const billingCycleActivityRoute: Routes = [
    {
        path: 'billing-cycle/:id/billing-cycle-activity',
        component: BillingCycleDetailComponent,
        resolve: {
            pagingParams: BillingCycleActivityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'billing-cycle-activity/:id',
        component: BillingCycleActivityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billingCycleActivityPopupRoute: Routes = [
    {
        path: 'billing-cycle-activity-new',
        component: BillingCycleActivityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-cycle-activity/:id/edit',
        component: BillingCycleActivityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-cycle-activity/:id/delete',
        component: BillingCycleActivityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
