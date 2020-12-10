import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ExpectedSavingsComponent } from './expected-savings.component';
import { ExpectedSavingsDetailComponent } from './expected-savings-detail.component';
import { ExpectedSavingsPopupComponent } from './expected-savings-dialog.component';
import { ExpectedSavingsDeletePopupComponent } from './expected-savings-delete-dialog.component';

@Injectable()
export class ExpectedSavingsResolvePagingParams implements Resolve<any> {
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

export const expectedSavingsRoute: Routes = [
    {
        path: 'expected-savings',
        component: ExpectedSavingsComponent,
        resolve: {
            pagingParams: ExpectedSavingsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.expectedSavings.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'expected-savings/:id',
        component: ExpectedSavingsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.expectedSavings.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const expectedSavingsPopupRoute: Routes = [
    {
        path: 'expected-savings-new',
        component: ExpectedSavingsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.expectedSavings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expected-savings-new/:customerType',
        component: ExpectedSavingsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.expectedSavings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expected-savings/:id/edit',
        component: ExpectedSavingsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.expectedSavings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'expected-savings/:id/delete',
        component: ExpectedSavingsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.expectedSavings.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
