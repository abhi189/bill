import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { JobExecutionAuditLogComponent } from './job-execution-audit-log.component';
import { JobExecutionAuditLogDetailComponent } from './job-execution-audit-log-detail.component';
import { JobExecutionAuditLogPopupComponent } from './job-execution-audit-log-dialog.component';
import { JobExecutionAuditLogDeletePopupComponent } from './job-execution-audit-log-delete-dialog.component';

@Injectable()
export class JobExecutionAuditLogResolvePagingParams implements Resolve<any> {
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

export const jobExecutionAuditLogRoute: Routes = [
    {
        path: 'job-execution-audit-log',
        component: JobExecutionAuditLogComponent,
        resolve: {
            pagingParams: JobExecutionAuditLogResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobExecutionAuditLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'job-execution-audit-log/:id',
        component: JobExecutionAuditLogDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobExecutionAuditLog.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const jobExecutionAuditLogPopupRoute: Routes = [
    {
        path: 'job-execution-audit-log-new',
        component: JobExecutionAuditLogPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobExecutionAuditLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-execution-audit-log/:id/edit',
        component: JobExecutionAuditLogPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobExecutionAuditLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'job-execution-audit-log/:id/delete',
        component: JobExecutionAuditLogDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.jobExecutionAuditLog.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
