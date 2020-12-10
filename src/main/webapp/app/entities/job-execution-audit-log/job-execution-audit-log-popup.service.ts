import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JobExecutionAuditLog } from './job-execution-audit-log.model';
import { JobExecutionAuditLogService } from './job-execution-audit-log.service';

@Injectable()
export class JobExecutionAuditLogPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private jobExecutionAuditLogService: JobExecutionAuditLogService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jobExecutionAuditLogService.find(id).subscribe((jobExecutionAuditLogResponse: HttpResponse<JobExecutionAuditLog>) => {
                    const jobExecutionAuditLog: JobExecutionAuditLog = jobExecutionAuditLogResponse.body;
                    if (jobExecutionAuditLog.executionDate) {
                        jobExecutionAuditLog.executionDate = {
                            year: jobExecutionAuditLog.executionDate.getFullYear(),
                            month: jobExecutionAuditLog.executionDate.getMonth() + 1,
                            day: jobExecutionAuditLog.executionDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.jobExecutionAuditLogModalRef(component, jobExecutionAuditLog);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobExecutionAuditLogModalRef(component, new JobExecutionAuditLog());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobExecutionAuditLogModalRef(component: Component, jobExecutionAuditLog: JobExecutionAuditLog): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.jobExecutionAuditLog = jobExecutionAuditLog;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
