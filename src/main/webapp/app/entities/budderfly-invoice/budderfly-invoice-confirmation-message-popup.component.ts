import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-invoice-confirmation-message-popup',
    templateUrl: './budderfly-invoice-confirmation-message-popup.component.html'
})
export class BudderflyInvoiceConfirmationMessagePopupComponent implements OnInit {
    generateInvoice: boolean;

    @Input()
    set isGenerateInvoice(isGenerateInvoice: boolean) {
        this.generateInvoice = isGenerateInvoice;
    }

    constructor(public activeModal: NgbActiveModal) {}

    ngOnInit() {}
}
