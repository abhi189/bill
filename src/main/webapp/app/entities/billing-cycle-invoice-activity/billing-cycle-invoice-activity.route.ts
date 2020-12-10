import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BillingCycleInvoiceActivityComponent } from './billing-cycle-invoice-activity.component';
import { BillingCycleInvoiceActivityDetailComponent } from './billing-cycle-invoice-activity-detail.component';
import { BillingCycleInvoiceActivityPopupComponent } from './billing-cycle-invoice-activity-dialog.component';
import { BillingCycleInvoiceActivityDeletePopupComponent } from './billing-cycle-invoice-activity-delete-dialog.component';

@Injectable()
export class BillingCycleInvoiceActivityResolvePagingParams implements Resolve<any> {
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

export const billingCycleInvoiceActivityRoute: Routes = [
    {
        path: 'billing-cycle/:billingCycleId/budderfly-invoice/:invoiceId',
        component: BillingCycleInvoiceActivityComponent,
        resolve: {
            pagingParams: BillingCycleInvoiceActivityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleInvoiceActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'billing-cycle-invoice-activity/:id',
        component: BillingCycleInvoiceActivityDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleInvoiceActivity.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billingCycleInvoiceActivityPopupRoute: Routes = [
    {
        path: 'billing-cycle-invoice-activity-new',
        component: BillingCycleInvoiceActivityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleInvoiceActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-cycle-invoice-activity/:id/edit',
        component: BillingCycleInvoiceActivityPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleInvoiceActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-cycle-invoice-activity/:id/delete',
        component: BillingCycleInvoiceActivityDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycleInvoiceActivity.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
