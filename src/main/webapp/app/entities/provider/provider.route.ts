import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { ProviderComponent } from './provider.component';
import { ProviderDetailComponent } from './provider-detail.component';
import { ProviderPopupComponent } from './provider-dialog.component';
import { ProviderDeletePopupComponent } from './provider-delete-dialog.component';

@Injectable()
export class ProviderResolvePagingParams implements Resolve<any> {
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

export const providerRoute: Routes = [
    {
        path: 'provider',
        component: ProviderComponent,
        resolve: {
            pagingParams: ProviderResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'provider/:id',
        component: ProviderDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const providerPopupRoute: Routes = [
    {
        path: 'provider-new',
        component: ProviderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider/:id/edit',
        component: ProviderPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'provider/:id/delete',
        component: ProviderDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.provider.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
