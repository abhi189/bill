import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { InvoiceUpload } from './invoice-upload.model';
import { InvoiceUploadService } from './invoice-upload.service';

@Injectable()
export class InvoiceUploadPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private invoiceUploadService: InvoiceUploadService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.invoiceUploadService.find(id).subscribe((invoiceUploadResponse: HttpResponse<InvoiceUpload>) => {
                    const invoiceUpload: InvoiceUpload = invoiceUploadResponse.body;
                    this.ngbModalRef = this.invoiceUploadModalRef(component, invoiceUpload);
                    resolve(this.ngbModalRef);
                });
            } else {
                setTimeout(() => {
                    this.ngbModalRef = this.invoiceUploadModalRef(component, new InvoiceUpload());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    invoiceUploadModalRef(component: Component, invoiceUpload: InvoiceUpload): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.invoiceUpload = invoiceUpload;
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
