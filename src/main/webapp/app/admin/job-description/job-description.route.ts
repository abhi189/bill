import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { JobDescriptionComponent } from './job-description.component';
import { JobDescriptionDetailComponent } from './job-description-detail.component';
import { JobDescriptionPopupComponent } from './job-description-dialog.component';
import { JobDescriptionDeletePopupComponent } from './job-description-delete-dialog.component';

@Injectable()
export class JobDescriptionResolvePagingParams implements Resolve<any> {
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

export const jobDescriptionRoute: Routes = [
    {
        path: 'job-description',
        component: JobDescriptionComponent,
        resolve: {
            pagingParams: JobDescriptionResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobDescription.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-description/:id',
        component: JobDescriptionDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobDescription.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobDescriptionPopupRoute: Routes = [
    {
        path: 'job-description-new',
        component: JobDescriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobDescription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-description/:id/edit',
        component: JobDescriptionPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobDescription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-description/:id/delete',
        component: JobDescriptionDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'jobDescription.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
