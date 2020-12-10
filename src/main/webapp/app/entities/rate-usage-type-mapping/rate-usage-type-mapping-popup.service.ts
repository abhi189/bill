import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';
import { RateUsageTypeMappingService } from './rate-usage-type-mapping.service';

@Injectable()
export class RateUsageTypeMappingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private rateUsageTypeMappingService: RateUsageTypeMappingService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.rateUsageTypeMappingService.find(id).subscribe((rateUsageTypeMappingResponse: HttpResponse<RateUsageTypeMapping>) => {
                    const rateUsageTypeMapping: RateUsageTypeMapping = rateUsageTypeMappingResponse.body;
                    this.ngbModalRef = this.rateUsageTypeMappingModalRef(component, rateUsageTypeMapping);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rateUsageTypeMappingModalRef(component, new RateUsageTypeMapping());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rateUsageTypeMappingModalRef(component: Component, rateUsageTypeMapping: RateUsageTypeMapping): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.rateUsageTypeMapping = rateUsageTypeMapping;
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
