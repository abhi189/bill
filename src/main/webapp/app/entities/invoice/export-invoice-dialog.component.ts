import { Input, Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Invoice } from './invoice.model';
import { InvoiceService } from './invoice.service';

@Component({
    selector: 'jhi-export-invoice-dialog',
    templateUrl: './export-invoice-dialog.component.html'
})
export class ExportInvoiceDialogComponent {
    @Input() system;
    @Input() partner;
    @Input() invoice: Invoice;

    constructor(public activeModal: NgbActiveModal, public invoiceService: InvoiceService) {}

    export() {
        const params = { system: this.system, partner: this.partner, withChecks: false };
        this.invoiceService
            .export(this.invoice, params)
            .subscribe(
                result => console.log('Invoice successfully exported', result),
                err => console.log('Error while exporting Invoice.', err)
            );
        this.activeModal.dismiss();
    }
}
