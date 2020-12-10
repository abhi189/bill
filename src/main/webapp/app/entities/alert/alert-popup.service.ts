import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Injectable()
export class AlertPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe, private modalService: NgbModal, private router: Router, private alertService: AlertService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.alertService.find(id).subscribe((alertResponse: HttpResponse<Alert>) => {
                    const alert: Alert = alertResponse.body;
                    alert.createdDate = this.datePipe.transform(alert.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    alert.lastModified = this.datePipe.transform(alert.lastModified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.alertModalRef(component, alert);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alertModalRef(component, new Alert());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alertModalRef(component: Component, alert: Alert): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.alert = alert;
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
