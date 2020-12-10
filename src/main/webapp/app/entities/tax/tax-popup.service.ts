import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Tax } from './tax.model';
import { TaxService } from './tax.service';

@Injectable()
export class TaxPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private taxService: TaxService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.taxService.find(id).subscribe((taxResponse: HttpResponse<Tax>) => {
                    const tax: Tax = taxResponse.body;
                    if (tax.vadidFrom) {
                        tax.vadidFrom = {
                            year: tax.vadidFrom.getFullYear(),
                            month: tax.vadidFrom.getMonth() + 1,
                            day: tax.vadidFrom.getDate()
                        };
                    }
                    if (tax.validTo) {
                        tax.validTo = {
                            year: tax.validTo.getFullYear(),
                            month: tax.validTo.getMonth() + 1,
                            day: tax.validTo.getDate()
                        };
                    }
                    this.ngbModalRef = this.taxModalRef(component, tax);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.taxModalRef(component, new Tax());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    taxModalRef(component: Component, tax: Tax): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.tax = tax;
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
