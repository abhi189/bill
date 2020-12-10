import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SiteAccountService } from '.';

@Component({
    selector: 'jhi-site-account-ame-delete-popup',
    template: `
        <form name="deleteForm">
            <div class="modal-header">
                <h4 class="modal-title" jhiTranslate="billingWebApp.invoice.rejectOperation.notAllowed">Reject operation not allowed</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" (click)="clear()">&times;</button>
            </div>
            <div class="modal-body">
                <jhi-alert-error></jhi-alert-error>
                <p>An Approved AME can't be rejected</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="clear()">
                    <span class="fa fa-ban"></span>&nbsp;<span jhiTranslate="billingWebApp.invoice.ok">Ok</span>
                </button>
            </div>
        </form>
    `
})
export class SeteAccountAmeNotRejectedComponent {
    @Input() ameStatus;

    constructor(public activeModal: NgbActiveModal, public siteAccountService: SiteAccountService) {}
    clear() {
        this.activeModal.dismiss('cancel');
    }
}
