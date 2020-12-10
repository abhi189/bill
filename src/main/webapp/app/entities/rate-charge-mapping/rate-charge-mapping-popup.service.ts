import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RateChargeMapping } from './rate-charge-mapping.model';
import { RateChargeMappingService } from './rate-charge-mapping.service';

@Injectable()
export class RateChargeMappingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private rateChargeMappingService: RateChargeMappingService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.rateChargeMappingService.find(id).subscribe((rateChargeMappingResponse: HttpResponse<RateChargeMapping>) => {
                    const rateChargeMapping: RateChargeMapping = rateChargeMappingResponse.body;
                    this.ngbModalRef = this.rateChargeMappingModalRef(component, rateChargeMapping);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rateChargeMappingModalRef(component, new RateChargeMapping());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rateChargeMappingModalRef(component: Component, rateChargeMapping: RateChargeMapping): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.rateChargeMapping = rateChargeMapping;
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
