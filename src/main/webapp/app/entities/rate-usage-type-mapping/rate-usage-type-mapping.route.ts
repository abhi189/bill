import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RateUsageTypeMappingComponent } from './rate-usage-type-mapping.component';
import { RateUsageTypeMappingDetailComponent } from './rate-usage-type-mapping-detail.component';
import { RateUsageTypeMappingPopupComponent } from './rate-usage-type-mapping-dialog.component';
import { RateUsageTypeMappingDeletePopupComponent } from './rate-usage-type-mapping-delete-dialog.component';
import { RateUsageTypeMappingEditPopupComponent } from './rate-usage-type-mapping-edit-dialog.component';

@Injectable()
export class RateUsageTypeMappingResolvePagingParams implements Resolve<any> {
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

export const rateUsageTypeMappingRoute: Routes = [
    {
        path: 'rate-usage-type-mapping',
        component: RateUsageTypeMappingComponent,
        resolve: {
            pagingParams: RateUsageTypeMappingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateUsageTypeMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rate-usage-type-mapping/:id',
        component: RateUsageTypeMappingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateUsageTypeMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rateUsageTypeMappingPopupRoute: Routes = [
    {
        path: 'rate-usage-type-mapping-new',
        component: RateUsageTypeMappingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateUsageTypeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-usage-type-mapping/:id/edit',
        component: RateUsageTypeMappingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateUsageTypeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-usage-type-mapping/:id/delete',
        component: RateUsageTypeMappingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateUsageTypeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-usage-type-mapping/:id/confirm-edit',
        component: RateUsageTypeMappingEditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateUsageTypeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
