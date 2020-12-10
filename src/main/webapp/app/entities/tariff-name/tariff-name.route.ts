import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TariffNameComponent } from './tariff-name.component';
import { TariffNameDetailComponent } from './tariff-name-detail.component';
import { TariffNamePopupComponent } from './tariff-name-dialog.component';
import { TariffNameDeletePopupComponent } from './tariff-name-delete-dialog.component';

@Injectable()
export class TariffNameResolvePagingParams implements Resolve<any> {
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

export const tariffNameRoute: Routes = [
    {
        path: 'tariff-name',
        component: TariffNameComponent,
        resolve: {
            pagingParams: TariffNameResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffName.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tariff-name/:id',
        component: TariffNameDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffName.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tariffNamePopupRoute: Routes = [
    {
        path: 'tariff-name-new',
        component: TariffNamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffName.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tariff-name/:id/edit',
        component: TariffNamePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffName.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tariff-name/:id/delete',
        component: TariffNameDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffName.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
