import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil } from 'ng-jhipster';

import { UserRouteAccessService } from '../../shared';
import { NoticeReportComponent } from './notice-report.component';
import { NoticeReportDetailComponent } from './notice-report-detail.component';

import { NoticeReportEventsComponent } from './notice-report-events/notice-report-events.component';
import { NoticeReportEventsDetailComponent } from './notice-report-events/notice-report-events-detail.component';

@Injectable()
export class NoticeReportResolvePagingParams implements Resolve<any> {
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

export const noticeReportRoute: Routes = [
    {
        path: 'notice-report',
        component: NoticeReportComponent,
        resolve: {
            pagingParams: NoticeReportResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.noticeReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notice-report/:id',
        component: NoticeReportDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.noticeReport.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notice-report/notice-report-events',
        component: NoticeReportEventsComponent,
        resolve: {
            pagingParams: NoticeReportResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.noticeReportEvents.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'notice-report/notice-report-events/:id',
        component: NoticeReportEventsDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'billingWebApp.noticeReportEvents.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];
