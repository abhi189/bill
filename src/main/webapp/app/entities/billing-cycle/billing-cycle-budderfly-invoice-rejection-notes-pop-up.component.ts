import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-billing-cycle-budderfly-invoice-rejection-notes-pop-up',
    template: `
        <form name="approveForm" (ngSubmit)="confirmReject()">
            <div class="modal-header">
                <h4 class="modal-title"><span jhiTranslate="billingWebApp.budderflyInvoice.rejectTitle">Reject Budderfly Invoice</span></h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" (click)="clear()">&times;</button>
            </div>
            <div class="modal-body">
                <textarea rows="8" class="form-control" name="rejectionNotes" id="field_rejectionNotes" [(ngModel)]="notes"> </textarea>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="clear()">
                    <span class="fa fa-ban"></span>&nbsp;<span jhiTranslate="entity.action.cancel">Cancel</span>
                </button>
                <button type="submit" class="btn btn-danger">
                    <span class="fa fa-remove"></span>&nbsp;<span jhiTranslate="billingWebApp.budderflyInvoice.reject">Reject</span>
                </button>
            </div>
        </form>
    `
})
export class BillingCycleBudderflyInvoiceRejectionNotesPopUpComponent {
    @Output() rejectionNotes = new EventEmitter<String>();

    @Input() notes: String;

    constructor(public activeModal: NgbActiveModal) {}

    confirmReject() {
        this.activeModal.dismiss(true);
        this.rejectionNotes.emit(this.notes);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
