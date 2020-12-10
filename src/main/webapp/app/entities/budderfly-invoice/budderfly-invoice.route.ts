import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { BudderflyInvoiceComponent } from './budderfly-invoice.component';
import { BudderflyInvoiceDetailComponent } from './budderfly-invoice-detail.component';
import { BudderflyInvoicePopupComponent } from './budderfly-invoice-dialog.component';
import { BudderflyInvoiceDeletePopupComponent } from './budderfly-invoice-delete-dialog.component';
import { AddSitesPopupComponent } from './add-sites.component';
import { BillingCycleInvoiceActivityResolvePagingParams } from '../billing-cycle-invoice-activity/billing-cycle-invoice-activity.route';
import { SolutionDetailComponent } from '../solution/solution-detail.component';
import { SolutionResolvePagingParams } from '../solution/solution.route';

@Injectable()
export class BudderflyInvoiceResolvePagingParams implements Resolve<any> {
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

export const budderflyInvoiceRoute: Routes = [
    {
        path: 'budderfly-invoice',
        component: BudderflyInvoiceComponent,
        resolve: {
            pagingParams: BudderflyInvoiceResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'budderfly-invoice/:id',
        component: BudderflyInvoiceDetailComponent,
        resolve: {
            pagingParams: BillingCycleInvoiceActivityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'billing-cycle/:billingCycleId/budderfly-invoice/:budderflyInvoiceId/solution/:id',
        component: SolutionDetailComponent,
        resolve: {
            pagingParams: SolutionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoice.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const budderflyInvoicePopupRoute: Routes = [
    {
        path: 'budderfly-invoice-new',
        component: BudderflyInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'budderfly-invoice/:id/edit',
        component: BudderflyInvoicePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'budderfly-invoice/:id/delete',
        component: BudderflyInvoiceDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.budderflyInvoice.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'budderfly-invoice/:id/add-sites',
        component: AddSitesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.billingCycle.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
