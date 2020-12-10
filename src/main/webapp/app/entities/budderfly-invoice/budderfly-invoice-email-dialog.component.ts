import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { BudderflyInvoiceService } from './budderfly-invoice.service';

@Component({
    selector: 'jhi-budderfly-invoice-email-dialog',
    templateUrl: './budderfly-invoice-email-dialog.component.html'
})
export class BudderflyInvoiceEmailDialogComponent {
    billingCycle = -1;

    @Input()
    set id(id: number) {
        this.billingCycle = id;
    }

    constructor(private buddeflyInvoiceService: BudderflyInvoiceService, public activeModal: NgbActiveModal) {}

    sendEmails() {
        this.buddeflyInvoiceService.pullInvoiceAndSend(this.billingCycle).subscribe();
        this.activeModal.dismiss();
    }
}
