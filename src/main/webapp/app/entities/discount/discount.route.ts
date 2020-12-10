import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { DiscountComponent } from './discount.component';
import { DiscountDetailComponent } from './discount-detail.component';
import { DiscountPopupComponent } from './discount-dialog.component';
import { DiscountDeletePopupComponent } from './discount-delete-dialog.component';
import { DiscountDuplicatePopupComponent } from './discount-duplicate-dialog.component';

@Injectable()
export class DiscountResolvePagingParams implements Resolve<any> {
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

export const discountRoute: Routes = [
    {
        path: 'discount',
        component: DiscountComponent,
        resolve: {
            pagingParams: DiscountResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.discount.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'discount/:id',
        component: DiscountDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.discount.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const discountPopupRoute: Routes = [
    {
        path: 'discount-new',
        component: DiscountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.discount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discount/:id/edit',
        component: DiscountPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.discount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discount/:id/delete',
        component: DiscountDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.discount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'discount/:id/duplicate',
        component: DiscountDuplicatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.discount.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
