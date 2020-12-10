import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { JobExecutionAuditLog } from './job-execution-audit-log.model';
import { JobExecutionAuditLogPopupService } from './job-execution-audit-log-popup.service';
import { JobExecutionAuditLogService } from './job-execution-audit-log.service';
import { JobDescription } from '../../admin/job-description/job-description.model';
import { JobDescriptionService } from '../../admin/job-description/job-description.service';

@Component({
    selector: 'jhi-job-execution-audit-log-dialog',
    templateUrl: './job-execution-audit-log-dialog.component.html'
})
export class JobExecutionAuditLogDialogComponent implements OnInit {
    jobExecutionAuditLog: JobExecutionAuditLog;
    isSaving: boolean;

    jobdescriptions: JobDescription[];
    executionDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private jobExecutionAuditLogService: JobExecutionAuditLogService,
        private jobDescriptionService: JobDescriptionService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.jobDescriptionService.query().subscribe(
            (res: HttpResponse<JobDescription[]>) => {
                this.jobdescriptions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.jobExecutionAuditLog.id !== undefined) {
            this.subscribeToSaveResponse(this.jobExecutionAuditLogService.update(this.jobExecutionAuditLog));
        } else {
            this.subscribeToSaveResponse(this.jobExecutionAuditLogService.create(this.jobExecutionAuditLog));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<JobExecutionAuditLog>>) {
        result.subscribe(
            (res: HttpResponse<JobExecutionAuditLog>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: JobExecutionAuditLog) {
        this.eventManager.broadcast({ name: 'jobExecutionAuditLogListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackJobDescriptionById(index: number, item: JobDescription) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-job-execution-audit-log-popup',
    template: ''
})
export class JobExecutionAuditLogPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobExecutionAuditLogPopupService: JobExecutionAuditLogPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.jobExecutionAuditLogPopupService.open(JobExecutionAuditLogDialogComponent as Component, params['id']);
            } else {
                this.jobExecutionAuditLogPopupService.open(JobExecutionAuditLogDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
