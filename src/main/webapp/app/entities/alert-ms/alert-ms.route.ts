import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { AlertMsComponent } from './alert-ms.component';
import { AlertMsDetailComponent } from './alert-ms-detail.component';
import { AlertMsPopupComponent } from './alert-ms-dialog.component';
import { AlertMsDeletePopupComponent } from './alert-ms-delete-dialog.component';
import { AlertNoteResolvePagingParams } from '../alert-note/alert-note.route';
import { AlertActivityResolvePagingParams } from '../alert-activity/alert-activity.route';

@Injectable()
export class AlertMsResolvePagingParams implements Resolve<any> {
    constructor(private paginationUtil: JhiPaginationUtil) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
        const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,desc';
        return {
            page: this.paginationUtil.parsePage(page),
            predicate: this.paginationUtil.parsePredicate(sort),
            ascending: this.paginationUtil.parseAscending(sort)
        };
    }
}

export const alertMsRoute: Routes = [
    {
        path: 'alert-ms',
        component: AlertMsComponent,
        resolve: {
            pagingParams: AlertMsResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertMs.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'alert-ms/:id',
        component: AlertMsDetailComponent,
        resolve: {
            pagingParams: AlertNoteResolvePagingParams,
            AlertActivityResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertMs.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const alertMsPopupRoute: Routes = [
    {
        path: 'alert-ms-new',
        component: AlertMsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertMs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert-ms/:id/edit',
        component: AlertMsPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertMs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'alert-ms/:id/delete',
        component: AlertMsDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.alertMs.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
