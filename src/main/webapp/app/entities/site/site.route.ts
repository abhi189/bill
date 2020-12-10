import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SiteComponent } from './site.component';
import { SiteDetailComponent } from './site-detail.component';
import { SiteDiscountPopupComponent } from './site-discount-dialog.component';
import { SitePopupComponent } from './site-dialog.component';
import { SiteDeletePopupComponent } from './site-delete-dialog.component';
import { SiteDiscountDeletePopupComponent } from './site-discount-delete-dialog.component';
import { EventResolvePagingParams } from '../event/event.route';

@Injectable()
export class SiteResolvePagingParams implements Resolve<any> {
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

export const siteRoute: Routes = [
    {
        path: 'site',
        component: SiteComponent,
        resolve: {
            pagingParams: SiteResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.site.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'site/:id',
        component: SiteDetailComponent,
        resolve: {
            paringParams: EventResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.site.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'site/:id/inventory-items/:inventoryItemId',
        component: SiteDetailComponent,
        resolve: {
            paringParams: EventResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.site.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const sitePopupRoute: Routes = [
    {
        path: 'site-new',
        component: SitePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.site.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site/:id/edit',
        component: SitePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.site.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site/:id/delete',
        component: SiteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.site.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

export const siteDiscountPopupRoute: Routes = [
    {
        path: 'site-discount/:siteDiscountId/edit',
        component: SiteDiscountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.siteDiscount.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-discount-new',
        component: SiteDiscountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.siteDiscount.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-discount/:siteDiscountId/delete',
        component: SiteDiscountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.siteDiscount.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
