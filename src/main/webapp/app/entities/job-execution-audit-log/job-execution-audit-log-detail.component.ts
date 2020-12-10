import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { JobExecutionAuditLog } from './job-execution-audit-log.model';
import { JobExecutionAuditLogService } from './job-execution-audit-log.service';

@Component({
    selector: 'jhi-job-execution-audit-log-detail',
    templateUrl: './job-execution-audit-log-detail.component.html'
})
export class JobExecutionAuditLogDetailComponent implements OnInit, OnDestroy {
    jobExecutionAuditLog: JobExecutionAuditLog;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jobExecutionAuditLogService: JobExecutionAuditLogService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInJobExecutionAuditLogs();
    }

    load(id) {
        this.jobExecutionAuditLogService.find(id).subscribe((jobExecutionAuditLogResponse: HttpResponse<JobExecutionAuditLog>) => {
            this.jobExecutionAuditLog = jobExecutionAuditLogResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInJobExecutionAuditLogs() {
        this.eventSubscriber = this.eventManager.subscribe('jobExecutionAuditLogListModification', response =>
            this.load(this.jobExecutionAuditLog.id)
        );
    }
}
