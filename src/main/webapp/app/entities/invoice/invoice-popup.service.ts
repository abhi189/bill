import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Injectable()
export class InvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private invoiceService: InvoiceService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.invoiceService.find(id).subscribe((invoiceResponse: HttpResponse<Invoice>) => {
                    const invoice: Invoice = invoiceResponse.body;
                    if (invoice.intervalStart) {
                        invoice.intervalStart = {
                            year: invoice.intervalStart.getFullYear(),
                            month: invoice.intervalStart.getMonth() + 1,
                            day: invoice.intervalStart.getDate()
                        };
                    }
                    if (invoice.intervalEnd) {
                        invoice.intervalEnd = {
                            year: invoice.intervalEnd.getFullYear(),
                            month: invoice.intervalEnd.getMonth() + 1,
                            day: invoice.intervalEnd.getDate()
                        };
                    }
                    this.ngbModalRef = this.invoiceModalRef(component, invoice);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceModalRef(component, new Invoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceModalRef(component: Component, invoice: Invoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.invoice = invoice;
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
