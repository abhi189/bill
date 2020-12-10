import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Consumption } from './consumption.model';
import { ConsumptionService } from './consumption.service';

@Injectable()
export class ConsumptionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private consumptionService: ConsumptionService
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
                this.consumptionService.find(id).subscribe((consumptionResponse: HttpResponse<Consumption>) => {
                    const consumption: Consumption = consumptionResponse.body;
                    consumption.intervalStart = this.datePipe.transform(consumption.intervalStart, 'yyyy-MM-ddTHH:mm:ss');
                    consumption.intervalEnd = this.datePipe.transform(consumption.intervalEnd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.consumptionModalRef(component, consumption);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.consumptionModalRef(component, new Consumption());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    consumptionModalRef(component: Component, consumption: Consumption): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.consumption = consumption;
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
