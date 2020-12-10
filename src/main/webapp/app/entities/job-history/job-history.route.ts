import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { JobHistoryComponent } from './job-history.component';
import { JobHistoryDetailComponent } from './job-history-detail.component';
import { JobHistoryPopupComponent } from './job-history-dialog.component';
import { JobHistoryDeletePopupComponent } from './job-history-delete-dialog.component';

@Injectable()
export class JobHistoryResolvePagingParams implements Resolve<any> {
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

export const jobHistoryRoute: Routes = [
    {
        path: 'job-history',
        component: JobHistoryComponent,
        resolve: {
            pagingParams: JobHistoryResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-history/:id',
        component: JobHistoryDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobHistoryPopupRoute: Routes = [
    {
        path: 'job-history-new',
        component: JobHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history/:id/edit',
        component: JobHistoryPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-history/:id/delete',
        component: JobHistoryDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobHistory.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
