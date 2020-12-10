import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AlertActivity } from './alert-activity.model';
import { AlertActivityService } from './alert-activity.service';

@Injectable()
export class AlertActivityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private alertActivityService: AlertActivityService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.alertActivityService.find(id).subscribe((alertActivityResponse: HttpResponse<AlertActivity>) => {
                    const alertActivity: AlertActivity = alertActivityResponse.body;
                    alertActivity.date = this.datePipe.transform(alertActivity.date, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.alertActivityModalRef(component, alertActivity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alertActivityModalRef(component, new AlertActivity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alertActivityModalRef(component: Component, alertActivity: AlertActivity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.alertActivity = alertActivity;
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
