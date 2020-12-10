import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { UtilityMappingRuleComponent } from './utility-mapping-rule.component';
import { UtilityMappingRuleJobTaskComponent } from './utility-mapping-rule-job-task.component';
import { UtilityMappingRuleDetailComponent } from './utility-mapping-rule-detail.component';
import { UtilityMappingRulePopupComponent } from './utility-mapping-rule-dialog.component';
import { UtilityMappingRuleDeletePopupComponent } from './utility-mapping-rule-delete-dialog.component';

@Injectable()
export class UtilityMappingRuleResolvePagingParams implements Resolve<any> {
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

export const utilityMappingRuleRoute: Routes = [
    {
        path: 'utility-mapping-rule',
        component: UtilityMappingRuleComponent,
        resolve: {
            pagingParams: UtilityMappingRuleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'utility-mapping-rule-job-task',
        component: UtilityMappingRuleJobTaskComponent,
        resolve: {
            pagingParams: UtilityMappingRuleResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'utility-mapping-rule/:id',
        component: UtilityMappingRuleDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const utilityMappingRulePopupRoute: Routes = [
    {
        path: 'utility-mapping-rule-new',
        component: UtilityMappingRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utility-mapping-rule/:id/edit',
        component: UtilityMappingRulePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'utility-mapping-rule/:id/delete',
        component: UtilityMappingRuleDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.utilityMappingRule.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
