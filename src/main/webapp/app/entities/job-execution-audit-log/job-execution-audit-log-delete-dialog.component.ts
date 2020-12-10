import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { JobExecutionAuditLog } from './job-execution-audit-log.model';
import { JobExecutionAuditLogPopupService } from './job-execution-audit-log-popup.service';
import { JobExecutionAuditLogService } from './job-execution-audit-log.service';

@Component({
    selector: 'jhi-job-execution-audit-log-delete-dialog',
    templateUrl: './job-execution-audit-log-delete-dialog.component.html'
})
export class JobExecutionAuditLogDeleteDialogComponent {
    jobExecutionAuditLog: JobExecutionAuditLog;

    constructor(
        private jobExecutionAuditLogService: JobExecutionAuditLogService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.jobExecutionAuditLogService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'jobExecutionAuditLogListModification',
                content: 'Deleted an jobExecutionAuditLog'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-job-execution-audit-log-delete-popup',
    template: ''
})
export class JobExecutionAuditLogDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private jobExecutionAuditLogPopupService: JobExecutionAuditLogPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.jobExecutionAuditLogPopupService.open(JobExecutionAuditLogDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
