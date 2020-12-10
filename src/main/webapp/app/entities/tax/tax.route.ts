import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TaxComponent } from './tax.component';
import { TaxDetailComponent } from './tax-detail.component';
import { TaxPopupComponent } from './tax-dialog.component';
import { TaxDeletePopupComponent } from './tax-delete-dialog.component';

@Injectable()
export class TaxResolvePagingParams implements Resolve<any> {
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

export const taxRoute: Routes = [
    {
        path: 'tax',
        component: TaxComponent,
        resolve: {
            pagingParams: TaxResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tax/:id',
        component: TaxDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taxPopupRoute: Routes = [
    {
        path: 'tax-new',
        component: TaxPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax/:id/edit',
        component: TaxPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tax/:id/delete',
        component: TaxDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tax.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
