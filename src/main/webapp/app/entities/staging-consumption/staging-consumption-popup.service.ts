import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { StagingConsumption } from './staging-consumption.model';
import { StagingConsumptionService } from './staging-consumption.service';

@Injectable()
export class StagingConsumptionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private stagingConsumptionService: StagingConsumptionService
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
                this.stagingConsumptionService.find(id).subscribe((stagingConsumptionResponse: HttpResponse<StagingConsumption>) => {
                    const stagingConsumption: StagingConsumption = stagingConsumptionResponse.body;
                    if (stagingConsumption.intervalStart) {
                        stagingConsumption.intervalStart = {
                            year: stagingConsumption.intervalStart.getFullYear(),
                            month: stagingConsumption.intervalStart.getMonth() + 1,
                            day: stagingConsumption.intervalStart.getDate()
                        };
                    }
                    if (stagingConsumption.intervalEnd) {
                        stagingConsumption.intervalEnd = {
                            year: stagingConsumption.intervalEnd.getFullYear(),
                            month: stagingConsumption.intervalEnd.getMonth() + 1,
                            day: stagingConsumption.intervalEnd.getDate()
                        };
                    }
                    if (stagingConsumption.meterReadDate) {
                        stagingConsumption.meterReadDate = {
                            year: stagingConsumption.meterReadDate.getFullYear(),
                            month: stagingConsumption.meterReadDate.getMonth() + 1,
                            day: stagingConsumption.meterReadDate.getDate()
                        };
                    }
                    if (stagingConsumption.previousMeterReadDate) {
                        stagingConsumption.previousMeterReadDate = {
                            year: stagingConsumption.previousMeterReadDate.getFullYear(),
                            month: stagingConsumption.previousMeterReadDate.getMonth() + 1,
                            day: stagingConsumption.previousMeterReadDate.getDate()
                        };
                    }
                    stagingConsumption.createdDate = this.datePipe.transform(stagingConsumption.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingConsumption.lastModified = this.datePipe.transform(stagingConsumption.lastModified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.stagingConsumptionModalRef(component, stagingConsumption);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stagingConsumptionModalRef(component, new StagingConsumption());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stagingConsumptionModalRef(component: Component, stagingConsumption: StagingConsumption): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.stagingConsumption = stagingConsumption;
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
