import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BillingCycleInvoiceActivity } from './billing-cycle-invoice-activity.model';
import { BillingCycleInvoiceActivityService } from './billing-cycle-invoice-activity.service';

@Injectable()
export class BillingCycleInvoiceActivityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private billingCycleInvoiceActivityService: BillingCycleInvoiceActivityService
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
                this.billingCycleInvoiceActivityService
                    .find(id)
                    .subscribe((billingCycleInvoiceActivityResponse: HttpResponse<BillingCycleInvoiceActivity>) => {
                        const billingCycleInvoiceActivity: BillingCycleInvoiceActivity = billingCycleInvoiceActivityResponse.body;
                        billingCycleInvoiceActivity.activityDate = this.datePipe.transform(
                            billingCycleInvoiceActivity.activityDate,
                            'yyyy-MM-ddTHH:mm:ss'
                        );
                        this.ngbModalRef = this.billingCycleInvoiceActivityModalRef(component, billingCycleInvoiceActivity);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.billingCycleInvoiceActivityModalRef(component, new BillingCycleInvoiceActivity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    billingCycleInvoiceActivityModalRef(component: Component, billingCycleInvoiceActivity: BillingCycleInvoiceActivity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.billingCycleInvoiceActivity = billingCycleInvoiceActivity;
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
