import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { StagingInvoice } from './staging-invoice.model';
import { StagingInvoiceService } from './staging-invoice.service';

@Injectable()
export class StagingInvoicePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private stagingInvoiceService: StagingInvoiceService
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
                this.stagingInvoiceService.find(id).subscribe((stagingInvoiceResponse: HttpResponse<StagingInvoice>) => {
                    const stagingInvoice: StagingInvoice = stagingInvoiceResponse.body;
                    if (stagingInvoice.intervalStart) {
                        stagingInvoice.intervalStart = {
                            year: stagingInvoice.intervalStart.getFullYear(),
                            month: stagingInvoice.intervalStart.getMonth() + 1,
                            day: stagingInvoice.intervalStart.getDate()
                        };
                    }
                    if (stagingInvoice.intervalEnd) {
                        stagingInvoice.intervalEnd = {
                            year: stagingInvoice.intervalEnd.getFullYear(),
                            month: stagingInvoice.intervalEnd.getMonth() + 1,
                            day: stagingInvoice.intervalEnd.getDate()
                        };
                    }
                    stagingInvoice.statementDate = this.datePipe.transform(stagingInvoice.statementDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingInvoice.dueByDate = this.datePipe.transform(stagingInvoice.dueByDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingInvoice.statementCreateDate = this.datePipe.transform(stagingInvoice.statementCreateDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingInvoice.updatedDate = this.datePipe.transform(stagingInvoice.updatedDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingInvoice.createdDate = this.datePipe.transform(stagingInvoice.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    stagingInvoice.lastModified = this.datePipe.transform(stagingInvoice.lastModified, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.stagingInvoiceModalRef(component, stagingInvoice);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stagingInvoiceModalRef(component, new StagingInvoice());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stagingInvoiceModalRef(component: Component, stagingInvoice: StagingInvoice): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.stagingInvoice = stagingInvoice;
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
