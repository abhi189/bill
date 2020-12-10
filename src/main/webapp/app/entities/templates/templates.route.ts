import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TemplatesComponent } from './templates.component';
import { TemplatesDetailComponent } from './templates-detail.component';
import { TemplatesPopupComponent } from './templates-dialog.component';
import { TemplatesDeletePopupComponent } from './templates-delete-dialog.component';

@Injectable()
export class TemplatesResolvePagingParams implements Resolve<any> {
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

export const templatesRoute: Routes = [
    {
        path: 'templates',
        component: TemplatesComponent,
        resolve: {
            pagingParams: TemplatesResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.templates.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'templates/:id',
        component: TemplatesDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.templates.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const templatesPopupRoute: Routes = [
    {
        path: 'templates-new',
        component: TemplatesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.templates.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'templates/:id/edit',
        component: TemplatesPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.templates.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'templates/:id/delete',
        component: TemplatesDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.templates.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
