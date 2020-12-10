import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { NoticeReportEvents } from './notice-report-events.model';
import { NoticeReportEventsService } from './notice-report-events.service';
import { ITEMS_PER_PAGE, Principal } from '../../../shared';

import { CampaignType } from '../notice-report.model';

@Component({
    selector: 'jhi-notice-report-events',
    templateUrl: './notice-report-events.component.html'
})
export class NoticeReportEventsComponent implements OnInit, OnDestroy {
    @Input() reportId: number;
    @Input() campaignType: CampaignType;

    currentAccount: any;
    noticeReportEvents: NoticeReportEvents[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    showSearch: boolean;

    constructor(
        private noticeReportEventsService: NoticeReportEventsService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            if (typeof data.pagingParams !== 'undefined') {
                this.page = data.pagingParams.page;
                this.previousPage = data.pagingParams.page;
                this.reverse = data.pagingParams.ascending;
                this.predicate = data.pagingParams.predicate;
                this.showSearch = true;
            } else {
                // When we are calling this component from the notice-report view, we dont send data.pagingParams
                this.page = 1;
                this.previousPage = 1;
                this.reverse = false;
                this.predicate = 'id';
                this.showSearch = false;
            }
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (typeof this.reportId === 'undefined') {
            if (this.currentSearch) {
                this.noticeReportEventsService
                    .search({
                        page: this.page - 1,
                        query: this.currentSearch,
                        size: this.itemsPerPage,
                        sort: this.sort()
                    })
                    .subscribe(
                        (res: HttpResponse<NoticeReportEvents[]>) => this.onSuccess(res.body, res.headers),
                        (res: HttpErrorResponse) => this.onError(res.message)
                    );
                return;
            }
            this.noticeReportEventsService
                .query({
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<NoticeReportEvents[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        } else {
            this.noticeReportEventsService
                .queryByReportId(this.reportId, {
                    page: this.page - 1,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<NoticeReportEvents[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
        }
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate([], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/notice-report-events',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;

        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNoticeReportEvents();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: NoticeReportEvents) {
        return item.id;
    }
    registerChangeInNoticeReportEvents() {
        this.eventSubscriber = this.eventManager.subscribe('noticeReportEventsListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.noticeReportEvents = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    isTest() {
        return this.campaignType.toString() === 'TEST';
    }
}
