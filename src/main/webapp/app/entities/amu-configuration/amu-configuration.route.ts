import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AmuConfigurationComponent } from './amu-configuration.component';
import { AmuConfigurationDetailComponent } from './amu-configuration-detail.component';
import { AmuConfigurationPopupComponent } from './amu-configuration-dialog.component';
import { AmuConfigurationDeletePopupComponent } from './amu-configuration-delete-dialog.component';

@Injectable()
export class AmuConfigurationResolvePagingParams implements Resolve<any> {
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

export const amuConfigurationRoute: Routes = [
    {
        path: 'amu-configuration',
        component: AmuConfigurationComponent,
        resolve: {
            pagingParams: AmuConfigurationResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.amuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'amu-configuration/:id',
        component: AmuConfigurationDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.amuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const amuConfigurationPopupRoute: Routes = [
    {
        path: 'amu-configuration-new',
        component: AmuConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.amuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'amu-configuration/:id/edit',
        component: AmuConfigurationPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.amuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'amu-configuration/:id/delete',
        component: AmuConfigurationDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.amuConfiguration.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
