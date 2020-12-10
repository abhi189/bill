import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NoticeReport, NoticeCountReport } from './notice-report.model';
import { NoticeReportService } from './notice-report.service';

import { ExcelService } from '../../shared/service/excel.service';
import { NoticeReportEventsService } from './notice-report-events/notice-report-events.service';

@Component({
    selector: 'jhi-notice-report-detail',
    templateUrl: './notice-report-detail.component.html'
})
export class NoticeReportDetailComponent implements OnInit, OnDestroy {
    noticeReport: NoticeReport;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    noticeCountReport: NoticeCountReport;

    constructor(
        private eventManager: JhiEventManager,
        private noticeReportService: NoticeReportService,
        private route: ActivatedRoute,
        private noticeReportEventsService: NoticeReportEventsService,
        private excelService: ExcelService
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInNoticeReports();
    }

    load(id) {
        this.noticeReportService.find(id).subscribe((noticeReportResponse: HttpResponse<NoticeReport>) => {
            this.noticeReport = noticeReportResponse.body;
        });

        this.noticeReportService.getCountReport(id).subscribe((noticeCountReportResponse: HttpResponse<NoticeCountReport>) => {
            this.noticeCountReport = noticeCountReportResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNoticeReports() {
        this.eventSubscriber = this.eventManager.subscribe('noticeReportListModification', response => this.load(this.noticeReport.id));
    }

    private onNoticeCountReportSuccess(data, headers) {
        this.noticeCountReport = data;
    }

    exportAsXLSX(): void {
        this.noticeReportEventsService.getAllinJSON(this.noticeReport.id).subscribe((res: HttpResponse<JSON[]>) => {
            const fileName: string = 'Report-' + this.noticeReport.id;
            this.excelService.exportAsExcelFile(res.body, fileName);
        });
    }
}
