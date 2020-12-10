import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { NoticeReport } from './notice-report.model';
import { NoticeReportService } from './notice-report.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TriggerCampaignComponent } from './trigger-campaign.component';

@Component({
    selector: 'jhi-notice-report',
    templateUrl: './notice-report.component.html'
})
export class NoticeReportComponent implements OnInit, OnDestroy {
    currentAccount: any;
    noticeReports: NoticeReport[];
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
    intervalId: any;

    constructor(
        private noticeReportService: NoticeReportService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager,
        private modalService: NgbModal
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
        this.intervalId = undefined;
    }

    loadAll() {
        if (this.currentSearch) {
            this.noticeReportService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<NoticeReport[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.queryForReports();
    }
    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }
    transition() {
        this.router.navigate(['/notice-report'], {
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
            '/notice-report',
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
        this.router.navigate([
            '/notice-report',
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInNoticeReports();
    }

    ngOnDestroy() {
        clearInterval(this.intervalId);
        this.intervalId = undefined;
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: NoticeReport) {
        return item.id;
    }
    registerChangeInNoticeReports() {
        this.eventSubscriber = this.eventManager.subscribe('noticeReportListModification', response => this.loadAll());
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
        this.noticeReports = data;
        // register a process that will update for the report list until the pending report is completed
        if (this.isThereAPendingReport()) {
            this.refresh();
        }
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    private queryForReports() {
        this.noticeReportService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<NoticeReport[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    private async reportExecuted() {
        this.jhiAlertService.info('billingWebApp.noticeReport.info.report-starting', null, null);
        // wait half second to request again the list of reports, the process that executes the report is async
        // and is returning before the new report is created.
        await new Promise(r => setTimeout(r, 10000));
        this.queryForReports();
    }

    private isThereAPendingReport() {
        for (let i = 0; i < this.noticeReports.length; i++) {
            if (this.noticeReports[i].status.toString() === 'PENDING') {
                return true;
            }
        }
        return false;
    }

    isNotPending(currentStatus: string) {
        if (currentStatus === 'PENDING') {
            return false;
        }
        return true;
    }

    private refresh() {
        if (this.intervalId === undefined) {
            this.intervalId = setInterval(() => {
                this.refreshReportList();
            }, 6000);
        }
    }

    refreshReportList() {
        this.queryForReports();
        if (this.isThereAPendingReport() === false) {
            clearInterval(this.intervalId);
            this.intervalId = undefined;
        }
    }

    openCampaignPopUp() {
        if (this.isThereAPendingReport()) {
            this.jhiAlertService.error('billingWebApp.noticeReport.info.running-campaign', null, null);
        } else {
            const modalRef = this.modalService.open(TriggerCampaignComponent, { size: 'sm' });
            modalRef.componentInstance.campaignExecuted.subscribe(campaign => {
                this.reportExecuted();
            });
        }
    }
}
