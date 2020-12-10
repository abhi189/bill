import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BillingCycleComponent } from './billing-cycle.component';
import { BillingCycleDetailComponent } from './billing-cycle-detail.component';
import { BillingCyclePopupComponent } from './billing-cycle-dialog.component';
import { BillingCycleDeletePopupComponent } from './billing-cycle-delete-dialog.component';
import { BudderflyInvoiceDetailComponent } from '../budderfly-invoice/budderfly-invoice-detail.component';

@Injectable()
export class BillingCycleResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let sort;
        if (route.component === BillingCycleComponent) {
            sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'statementDate,desc';
        } else {
            sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
        }
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';

        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}
export const billingCycleRoute: Routes = [
    {
        path: 'billing-cycle',
        component: BillingCycleComponent,
        resolve: {
            pagingParams: BillingCycleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'billing-cycle/:id',
        component: BillingCycleDetailComponent,
        resolve: {
            pagingParams: BillingCycleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycle.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'billing-cycle/:id/budderfly-invoice/:budderflyInvoiceId',
        component: BudderflyInvoiceDetailComponent,
        resolve: {
            pagingParams: BillingCycleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycle.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const billingCyclePopupRoute: Routes = [
    {
        path: 'billing-cycle-new',
        component: BillingCyclePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-cycle/:id/edit',
        component: BillingCyclePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'billing-cycle/:id/delete',
        component: BillingCycleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
