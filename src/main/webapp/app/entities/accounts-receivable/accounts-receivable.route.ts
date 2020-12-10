import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AccountsReceivableComponent } from './accounts-receivable.component';
import { AccountsReceivableDetailComponent } from './accounts-receivable-detail.component';
import { AccountsReceivablePopupComponent } from './accounts-receivable-dialog.component';
import { AccountsReceivableDeletePopupComponent } from './accounts-receivable-delete-dialog.component';

@Injectable()
export class AccountsReceivableResolvePagingParams implements Resolve<any> {
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

export const accountsReceivableRoute: Routes = [
    {
        path: 'accounts-receivable',
        component: AccountsReceivableComponent,
        resolve: {
            pagingParams: AccountsReceivableResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.accountsReceivable.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'accounts-receivable/:id',
        component: AccountsReceivableDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.accountsReceivable.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const accountsReceivablePopupRoute: Routes = [
    {
        path: 'accounts-receivable-new',
        component: AccountsReceivablePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.accountsReceivable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accounts-receivable/:id/edit',
        component: AccountsReceivablePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.accountsReceivable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'accounts-receivable/:id/delete',
        component: AccountsReceivableDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.accountsReceivable.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
