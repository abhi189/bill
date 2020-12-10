import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RateComponentMappingComponent } from './rate-component-mapping.component';
import { RateComponentMappingDetailComponent } from './rate-component-mapping-detail.component';
import { RateComponentMappingPopupComponent } from './rate-component-mapping-dialog.component';
import { RateComponentMappingDeletePopupComponent } from './rate-component-mapping-delete-dialog.component';
import { RateComponentMappingEditPopupComponent } from './rate-component-mapping-edit-dialog.component';

@Injectable()
export class RateComponentMappingResolvePagingParams implements Resolve<any> {
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

export const rateComponentMappingRoute: Routes = [
    {
        path: 'rate-component-mapping',
        component: RateComponentMappingComponent,
        resolve: {
            pagingParams: RateComponentMappingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateComponentMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rate-component-mapping/:id',
        component: RateComponentMappingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateComponentMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rateComponentMappingPopupRoute: Routes = [
    {
        path: 'rate-component-mapping-new',
        component: RateComponentMappingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateComponentMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-component-mapping/:id/edit',
        component: RateComponentMappingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateComponentMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-component-mapping/:id/delete',
        component: RateComponentMappingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateComponentMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-component-mapping/:id/confirm-edit',
        component: RateComponentMappingEditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateComponentMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
