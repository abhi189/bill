import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { BudderflyInvoice } from './budderfly-invoice.model';
import { BudderflyInvoiceService } from './budderfly-invoice.service';

@Injectable()
export class BudderflyInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private budderflyInvoiceService: BudderflyInvoiceService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.budderflyInvoiceService.find(id).subscribe((budderflyInvoiceResponse: HttpResponse<BudderflyInvoice>) => {
                    const budderflyInvoice: BudderflyInvoice = budderflyInvoiceResponse.body;
                    if (budderflyInvoice.lastInvoice) {
                        budderflyInvoice.lastInvoice = {
                            year: budderflyInvoice.lastInvoice.getFullYear(),
                            month: budderflyInvoice.lastInvoice.getMonth() + 1,
                            day: budderflyInvoice.lastInvoice.getDate()
                        };
                    }
                    if (budderflyInvoice.LEDInstallDate) {
                        budderflyInvoice.LEDInstallDate = {
                            year: budderflyInvoice.LEDInstallDate.getFullYear(),
                            month: budderflyInvoice.LEDInstallDate.getMonth() + 1,
                            day: budderflyInvoice.LEDInstallDate.getDate()
                        };
                    }
                    if (budderflyInvoice.accountTakeOverDate) {
                        budderflyInvoice.accountTakeOverDate = {
                            year: budderflyInvoice.accountTakeOverDate.getFullYear(),
                            month: budderflyInvoice.accountTakeOverDate.getMonth() + 1,
                            day: budderflyInvoice.accountTakeOverDate.getDate()
                        };
                    }
                    if (budderflyInvoice.startDate) {
                        budderflyInvoice.startDate = {
                            year: budderflyInvoice.startDate.getFullYear(),
                            month: budderflyInvoice.startDate.getMonth() + 1,
                            day: budderflyInvoice.startDate.getDate()
                        };
                    }
                    if (budderflyInvoice.endDate) {
                        budderflyInvoice.endDate = {
                            year: budderflyInvoice.endDate.getFullYear(),
                            month: budderflyInvoice.endDate.getMonth() + 1,
                            day: budderflyInvoice.endDate.getDate()
                        };
                    }
                    if (budderflyInvoice.statementDate) {
                        budderflyInvoice.statementDate = {
                            year: budderflyInvoice.statementDate.getFullYear(),
                            month: budderflyInvoice.statementDate.getMonth() + 1,
                            day: budderflyInvoice.statementDate.getDate()
                        };
                    }
                    if (budderflyInvoice.dueDate) {
                        budderflyInvoice.dueDate = {
                            year: budderflyInvoice.dueDate.getFullYear(),
                            month: budderflyInvoice.dueDate.getMonth() + 1,
                            day: budderflyInvoice.dueDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.budderflyInvoiceModalRef(component, budderflyInvoice);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.budderflyInvoiceModalRef(component, new BudderflyInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    budderflyInvoiceModalRef(component: Component, budderflyInvoice: BudderflyInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.budderflyInvoice = budderflyInvoice;
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
