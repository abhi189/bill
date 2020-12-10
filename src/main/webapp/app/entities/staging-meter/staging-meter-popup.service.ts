import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { StagingMeter } from './staging-meter.model';
import { StagingMeterService } from './staging-meter.service';

@Injectable()
export class StagingMeterPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private stagingMeterService: StagingMeterService
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
                this.stagingMeterService.find(id).subscribe((stagingMeterResponse: HttpResponse<StagingMeter>) => {
                    const stagingMeter: StagingMeter = stagingMeterResponse.body;
                    if (stagingMeter.intervalStart) {
                        stagingMeter.intervalStart = {
                            year: stagingMeter.intervalStart.getFullYear(),
                            month: stagingMeter.intervalStart.getMonth() + 1,
                            day: stagingMeter.intervalStart.getDate()
                        };
                    }
                    if (stagingMeter.intervalEnd) {
                        stagingMeter.intervalEnd = {
                            year: stagingMeter.intervalEnd.getFullYear(),
                            month: stagingMeter.intervalEnd.getMonth() + 1,
                            day: stagingMeter.intervalEnd.getDate()
                        };
                    }
                    stagingMeter.createDate = this.datePipe.transform(stagingMeter.createDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingMeter.lastModified = this.datePipe.transform(stagingMeter.lastModified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.stagingMeterModalRef(component, stagingMeter);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stagingMeterModalRef(component, new StagingMeter());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stagingMeterModalRef(component: Component, stagingMeter: StagingMeter): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.stagingMeter = stagingMeter;
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
