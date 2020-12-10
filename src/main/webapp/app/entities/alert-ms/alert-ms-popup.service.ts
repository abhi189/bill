import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AlertMs } from './alert-ms.model';
import { AlertMsService } from './alert-ms.service';

@Injectable()
export class AlertMsPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private alertMsService: AlertMsService
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
                this.alertMsService.find(id).subscribe((alertMsResponse: HttpResponse<AlertMs>) => {
                    const alertMs: AlertMs = alertMsResponse.body;
                    alertMs.alertDate = this.datePipe.transform(alertMs.alertDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.alertMsModalRef(component, alertMs);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.alertMsModalRef(component, new AlertMs());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    alertMsModalRef(component: Component, alertMs: AlertMs): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.alertMs = alertMs;
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
