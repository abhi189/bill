import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteAccountService } from '.';

@Component({
    selector: 'jhi-site-account-reject-ame-popup',
    template: `
        <form name="rejectForm" (ngSubmit)="confirmReject(ameId)">
            <div class="modal-header">
                <h4 class="modal-title" jhiTranslate="billingWebApp.invoice.rejectTitle">Confirm reject operation</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" (click)="clear()">&times;</button>
            </div>
            <div class="modal-body">
                <jhi-alert-error></jhi-alert-error>
                <p>Are you sure you want to reject this Ame created in {{ ameCreatedDate | date: 'medium':'UTC' }}?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="clear()">
                    <span class="fa fa-ban"></span>&nbsp;<span jhiTranslate="entity.action.cancel">Cancel</span>
                </button>
                <button type="submit" class="btn btn-danger">
                    <span class="fa fa-remove"></span>&nbsp;<span jhiTranslate="billingWebApp.invoice.reject">Reject</span>
                </button>
            </div>
        </form>
    `
})
export class SiteAccountRejectAmePopupComponent {
    @Output() ameRejected = new EventEmitter<number>();

    @Input() ameId;
    @Input() ameCreatedDate;

    constructor(public activeModal: NgbActiveModal, public siteAccountService: SiteAccountService) {}

    confirmReject(id: number) {
        this.activeModal.dismiss(true);
        this.ameRejected.emit(id);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
