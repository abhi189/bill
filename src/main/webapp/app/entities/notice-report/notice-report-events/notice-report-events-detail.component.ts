import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NoticeReportEvents } from './notice-report-events.model';
import { NoticeReportEventsService } from './notice-report-events.service';

@Component({
    selector: 'jhi-notice-report-events-detail',
    templateUrl: './notice-report-events-detail.component.html'
})
export class NoticeReportEventsDetailComponent implements OnInit, OnDestroy {
    noticeReportEvents: NoticeReportEvents;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private noticeReportEventsService: NoticeReportEventsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInNoticeReportEvents();
    }

    load(id) {
        this.noticeReportEventsService.find(id).subscribe((noticeReportEventsResponse: HttpResponse<NoticeReportEvents>) => {
            this.noticeReportEvents = noticeReportEventsResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNoticeReportEvents() {
        this.eventSubscriber = this.eventManager.subscribe('noticeReportEventsListModification', response =>
            this.load(this.noticeReportEvents.id)
        );
    }
}
