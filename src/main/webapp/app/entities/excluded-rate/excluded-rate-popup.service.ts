import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ExcludedRate } from './excluded-rate.model';
import { ExcludedRateService } from './excluded-rate.service';

@Injectable()
export class ExcludedRatePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private excludedRateService: ExcludedRateService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.excludedRateService.find(id).subscribe((excludedRateResponse: HttpResponse<ExcludedRate>) => {
                    const excludedRate: ExcludedRate = excludedRateResponse.body;
                    this.ngbModalRef = this.excludedRateModalRef(component, excludedRate);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.excludedRateModalRef(component, new ExcludedRate());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    excludedRateModalRef(component: Component, excludedRate: ExcludedRate): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.excludedRate = excludedRate;
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
