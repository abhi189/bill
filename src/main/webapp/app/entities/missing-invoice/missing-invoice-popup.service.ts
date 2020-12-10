import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { MissingInvoice } from './missing-invoice.model';
import { MissingInvoiceService } from './missing-invoice.service';

@Injectable()
export class MissingInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private missingInvoiceService: MissingInvoiceService
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
                this.missingInvoiceService.find(id).subscribe((missingInvoiceResponse: HttpResponse<MissingInvoice>) => {
                    const missingInvoice: MissingInvoice = missingInvoiceResponse.body;
                    missingInvoice.takeOverDate = this.datePipe.transform(missingInvoice.takeOverDate, 'yyyy-MM-ddTHH:mm:ss');
                    missingInvoice.startDate = this.datePipe.transform(missingInvoice.startDate, 'yyyy-MM-ddTHH:mm:ss');
                    missingInvoice.endDate = this.datePipe.transform(missingInvoice.endDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.missingInvoiceModalRef(component, missingInvoice);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.missingInvoiceModalRef(component, new MissingInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    missingInvoiceModalRef(component: Component, missingInvoice: MissingInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.missingInvoice = missingInvoice;
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
