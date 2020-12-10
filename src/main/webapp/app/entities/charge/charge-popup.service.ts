import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Charge } from './charge.model';
import { ChargeService } from './charge.service';

@Injectable()
export class ChargePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe, private modalService: NgbModal, private router: Router, private chargeService: ChargeService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.chargeService.find(id).subscribe((chargeResponse: HttpResponse<Charge>) => {
                    const charge: Charge = chargeResponse.body;
                    charge.intervalStart = this.datePipe.transform(charge.intervalStart, 'yyyy-MM-ddTHH:mm:ss');
                    charge.intervalEnd = this.datePipe.transform(charge.intervalEnd, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.chargeModalRef(component, charge);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.chargeModalRef(component, new Charge());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    chargeModalRef(component: Component, charge: Charge): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.charge = charge;
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
