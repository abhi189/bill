import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SiteAccountComponent } from './site-account.component';
import { SiteAccountDetailComponent } from './site-account-detail.component';
import { SiteAccountPopupComponent } from './site-account-dialog.component';
import { SiteAccountDeletePopupComponent } from './site-account-delete-dialog.component';

@Injectable()
export class SiteAccountResolvePagingParams implements Resolve<any> {
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

export const siteAccountRoute: Routes = [
    {
        path: 'site-account',
        component: SiteAccountComponent,
        resolve: {
            pagingParams: SiteAccountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'site-account/:id',
        component: SiteAccountDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const siteAccountPopupRoute: Routes = [
    {
        path: 'site-account-new',
        component: SiteAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-account/:id/edit',
        component: SiteAccountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'site-account/:id/delete',
        component: SiteAccountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.siteAccount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
