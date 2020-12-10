import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TariffComponent } from './tariff.component';
import { TariffDetailComponent } from './tariff-detail.component';
import { TariffPopupComponent } from './tariff-dialog.component';
import { TariffDeletePopupComponent } from './tariff-delete-dialog.component';

@Injectable()
export class TariffResolvePagingParams implements Resolve<any> {
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

export const tariffRoute: Routes = [
    {
        path: 'tariff',
        component: TariffComponent,
        resolve: {
            pagingParams: TariffResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariff.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tariff/:id',
        component: TariffDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariff.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tariffPopupRoute: Routes = [
    {
        path: 'tariff-new',
        component: TariffPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariff.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tariff/:id/edit',
        component: TariffPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariff.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tariff/:id/delete',
        component: TariffDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariff.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
