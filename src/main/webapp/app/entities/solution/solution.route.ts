import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { SolutionComponent } from './solution.component';
import { SolutionDetailComponent } from './solution-detail.component';
import { SolutionPopupComponent } from './solution-dialog.component';
import { SolutionDeletePopupComponent } from './solution-delete-dialog.component';

@Injectable()
export class SolutionResolvePagingParams implements Resolve<any> {
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

export const solutionRoute: Routes = [
    {
        path: 'billing-cycle/:billingCycleId/budderfly-invoice/:budderflyInvoiceId',
        component: SolutionComponent,
        resolve: {
            pagingParams: SolutionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.solution.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'solution/:id',
        component: SolutionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.solution.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const solutionPopupRoute: Routes = [
    {
        path: 'solution-new',
        component: SolutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.solution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solution/:id/edit',
        component: SolutionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.solution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'solution/:id/delete',
        component: SolutionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.solution.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
