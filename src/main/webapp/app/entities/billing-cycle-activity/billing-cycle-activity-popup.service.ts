import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { BillingCycleActivity } from './billing-cycle-activity.model';
import { BillingCycleActivityService } from './billing-cycle-activity.service';

@Injectable()
export class BillingCycleActivityPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private billingCycleActivityService: BillingCycleActivityService
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
                this.billingCycleActivityService.find(id).subscribe((billingCycleActivityResponse: HttpResponse<BillingCycleActivity>) => {
                    const billingCycleActivity: BillingCycleActivity = billingCycleActivityResponse.body;
                    billingCycleActivity.activityDate = this.datePipe.transform(billingCycleActivity.activityDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.billingCycleActivityModalRef(component, billingCycleActivity);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.billingCycleActivityModalRef(component, new BillingCycleActivity());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    billingCycleActivityModalRef(component: Component, billingCycleActivity: BillingCycleActivity): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.billingCycleActivity = billingCycleActivity;
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
