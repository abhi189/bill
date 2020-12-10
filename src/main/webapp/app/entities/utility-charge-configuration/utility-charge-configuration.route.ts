import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UtilityChargeConfigurationComponent } from './utility-charge-configuration.component';
import { UtilityChargeConfigurationDetailComponent } from './utility-charge-configuration-detail.component';
import { UtilityChargeConfigurationPopupComponent } from './utility-charge-configuration-dialog.component';
import { UtilityChargeConfigurationDeletePopupComponent } from './utility-charge-configuration-delete-dialog.component';

@Injectable()
export class UtilityChargeConfigurationResolvePagingParams implements Resolve<any> {
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

export const utilityChargeConfigurationRoute: Routes = [
    {
        path: 'utility-charge-configuration',
        component: UtilityChargeConfigurationComponent,
        resolve: {
            pagingParams: UtilityChargeConfigurationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityChargeConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'utility-charge-configuration/:id',
        component: UtilityChargeConfigurationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityChargeConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const utilityChargeConfigurationPopupRoute: Routes = [
    {
        path: 'utility-charge-configuration-new',
        component: UtilityChargeConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityChargeConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utility-charge-configuration/:id/edit',
        component: UtilityChargeConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityChargeConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utility-charge-configuration/:id/delete',
        component: UtilityChargeConfigurationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityChargeConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
