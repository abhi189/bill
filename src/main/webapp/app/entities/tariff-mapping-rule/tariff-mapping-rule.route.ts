import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { TariffMappingRuleComponent } from './tariff-mapping-rule.component';
import { TariffMappingRuleDetailComponent } from './tariff-mapping-rule-detail.component';
import { TariffMappingRulePopupComponent } from './tariff-mapping-rule-dialog.component';
import { TariffMappingRuleDeletePopupComponent } from './tariff-mapping-rule-delete-dialog.component';

@Injectable()
export class TariffMappingRuleResolvePagingParams implements Resolve<any> {
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

export const tariffMappingRuleRoute: Routes = [
    {
        path: 'tariff-mapping-rule',
        component: TariffMappingRuleComponent,
        resolve: {
            pagingParams: TariffMappingRuleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'tariff-mapping-rule/:id',
        component: TariffMappingRuleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tariffMappingRulePopupRoute: Routes = [
    {
        path: 'tariff-mapping-rule-new',
        component: TariffMappingRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tariff-mapping-rule/:id/edit',
        component: TariffMappingRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tariff-mapping-rule/:id/delete',
        component: TariffMappingRuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.tariffMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
