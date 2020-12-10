import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { StagingCharge } from './staging-charge.model';
import { StagingChargeService } from './staging-charge.service';

@Injectable()
export class StagingChargePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private stagingChargeService: StagingChargeService
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
                this.stagingChargeService.find(id).subscribe((stagingChargeResponse: HttpResponse<StagingCharge>) => {
                    const stagingCharge: StagingCharge = stagingChargeResponse.body;
                    if (stagingCharge.intervalStart) {
                        stagingCharge.intervalStart = {
                            year: stagingCharge.intervalStart.getFullYear(),
                            month: stagingCharge.intervalStart.getMonth() + 1,
                            day: stagingCharge.intervalStart.getDate()
                        };
                    }
                    if (stagingCharge.intervalEnd) {
                        stagingCharge.intervalEnd = {
                            year: stagingCharge.intervalEnd.getFullYear(),
                            month: stagingCharge.intervalEnd.getMonth() + 1,
                            day: stagingCharge.intervalEnd.getDate()
                        };
                    }
                    stagingCharge.createDate = this.datePipe.transform(stagingCharge.createDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingCharge.lastModified = this.datePipe.transform(stagingCharge.lastModified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.stagingChargeModalRef(component, stagingCharge);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stagingChargeModalRef(component, new StagingCharge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stagingChargeModalRef(component: Component, stagingCharge: StagingCharge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.stagingCharge = stagingCharge;
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
