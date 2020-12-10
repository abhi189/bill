import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { RateChargeMappingComponent } from './rate-charge-mapping.component';
import { RateChargeMappingDetailComponent } from './rate-charge-mapping-detail.component';
import { RateChargeMappingPopupComponent } from './rate-charge-mapping-dialog.component';
import { RateChargeMappingDeletePopupComponent } from './rate-charge-mapping-delete-dialog.component';
import { RateChargeMappingEditPopupComponent } from './rate-charge-mapping-edit-dialog.component';

@Injectable()
export class RateChargeMappingResolvePagingParams implements Resolve<any> {
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

export const rateChargeMappingRoute: Routes = [
    {
        path: 'rate-charge-mapping',
        component: RateChargeMappingComponent,
        resolve: {
            pagingParams: RateChargeMappingResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateChargeMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'rate-charge-mapping/:id',
        component: RateChargeMappingDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateChargeMapping.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const rateChargeMappingPopupRoute: Routes = [
    {
        path: 'rate-charge-mapping-new',
        component: RateChargeMappingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateChargeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-charge-mapping/:id/edit',
        component: RateChargeMappingPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateChargeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-charge-mapping/:id/delete',
        component: RateChargeMappingDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateChargeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'rate-charge-mapping/:id/confirm-edit',
        component: RateChargeMappingEditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.rateChargeMapping.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
