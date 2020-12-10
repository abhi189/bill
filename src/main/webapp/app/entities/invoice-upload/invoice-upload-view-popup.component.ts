import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { InvoiceUploadService } from './invoice-upload.service';
import { InvoiceUpload } from './invoice-upload.model';
import { HttpResponse } from '@angular/common/http';

@Component({
    selector: 'jhi-invoice-uploaded-view',
    templateUrl: './invoice-upload-view-popup.component.html'
})
export class InvoiceUploadViewPopUpComponent implements OnInit {
    invoiceUpload: any;
    requestEntity = false;
    error = false;

    @Input()
    set invoice(invoiceUpload: any) {
        this.invoiceUpload = invoiceUpload;
    }

    constructor(public activeModal: NgbActiveModal, private router: Router, private invoiceUploadService: InvoiceUploadService) {}

    ngOnInit() {
        this.requestEntity = false;

        for (let i = 0; i < this.invoiceUpload.stagingInvoices.length && this.requestEntity === false; i++) {
            // if we detect one missing billingInvoiceId then we need to try to refresh the entity.
            if (!this.invoiceUpload.stagingInvoices[i].billingInvoiceId) {
                this.requestEntity = true;
            }
        }

        if (this.requestEntity) {
            this.invoiceUploadService.find(this.invoiceUpload.id).subscribe((invoiceUploadResponse: HttpResponse<InvoiceUpload>) => {
                this.invoiceUpload = invoiceUploadResponse.body;
            });
        }
    }

    goToLink(invoiceId) {
        if (invoiceId) {
            this.router.navigate(['/invoice', invoiceId]);
            this.activeModal.close();
        } else {
            console.log('Invoice Id is undefined');
        }
    }

    clear() {
        this.activeModal.close();
    }

    isDisabled(billingInvoiceId) {
        if (billingInvoiceId) {
            return false;
        }
        return true;
    }
}
