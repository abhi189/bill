import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { JobDescription } from './job-description.model';
import { JobDescriptionService } from './job-description.service';

@Injectable()
export class JobDescriptionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private jobDescriptionService: JobDescriptionService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.jobDescriptionService.find(id).subscribe((jobDescriptionResponse: HttpResponse<JobDescription>) => {
                    const jobDescription: JobDescription = jobDescriptionResponse.body;
                    this.ngbModalRef = this.jobDescriptionModalRef(component, jobDescription);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.jobDescriptionModalRef(component, new JobDescription());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    jobDescriptionModalRef(component: Component, jobDescription: JobDescription): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.jobDescription = jobDescription;
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
