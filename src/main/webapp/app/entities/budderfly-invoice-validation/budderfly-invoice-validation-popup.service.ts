import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BudderflyInvoiceValidation } from './budderfly-invoice-validation.model';
import { BudderflyInvoiceValidationService } from './budderfly-invoice-validation.service';

@Injectable()
export class BudderflyInvoiceValidationPopupService {
    private ngbModalRef: NgbModalRef;
    private endpoints: String[];

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private budderflyInvoiceValidationService: BudderflyInvoiceValidationService
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
                this.budderflyInvoiceValidationService
                    .find(id)
                    .subscribe((budderflyInvoiceValidationResponse: HttpResponse<BudderflyInvoiceValidation>) => {
                        const budderflyInvoiceValidation: BudderflyInvoiceValidation = budderflyInvoiceValidationResponse.body;
                        this.ngbModalRef = this.budderflyInvoiceValidationModalRef(component, budderflyInvoiceValidation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                this.budderflyInvoiceValidationService.getEndpoints().subscribe((endpoints: HttpResponse<String[]>) => {
                    this.endpoints = endpoints.body;
                    // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                    setTimeout(() => {
                        this.ngbModalRef = this.budderflyInvoiceValidationModalRef(component, new BudderflyInvoiceValidation());
                        resolve(this.ngbModalRef);
                    }, 0);
                });
            }
        });
    }

    budderflyInvoiceValidationModalRef(component: Component, budderflyInvoiceValidation: BudderflyInvoiceValidation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.budderflyInvoiceValidation = budderflyInvoiceValidation;
        modalRef.componentInstance.endpoints = this.endpoints;
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
