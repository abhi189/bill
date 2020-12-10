import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { MeterPopupComponent } from './meter-dialog.component';

@Injectable()
export class MeterResolvePagingParams implements Resolve<any> {
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

export const solutionRoute: Routes = [];

export const meterPopupRoute: Routes = [
    {
        path: 'meter/:id/edit',
        component: MeterPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.meter.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
