import { Component, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AmeAlgorithm } from '../../shared/model/ame.model';
import { SiteAccountService } from '.';

@Component({
    selector: 'jhi-site-account-ame-delete-popup',
    template: `
        <form name="deleteForm" (ngSubmit)="confirmDelete(ameId)">
            <div class="modal-header">
                <h4 class="modal-title" jhiTranslate="entity.delete.title">Confirm delete operation</h4>
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true" (click)="clear()">&times;</button>
            </div>
            <div class="modal-body">
                <jhi-alert-error></jhi-alert-error>
                <p>Are you sure you want to delete this Ame created in {{ ameCreatedDate | date: 'medium':'UTC' }}?</p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal" (click)="clear()">
                    <span class="fa fa-ban"></span>&nbsp;<span jhiTranslate="entity.action.cancel">Cancel</span>
                </button>
                <button type="submit" class="btn btn-danger">
                    <span class="fa fa-remove"></span>&nbsp;<span jhiTranslate="entity.action.delete">Delete</span>
                </button>
            </div>
        </form>
    `
})
export class SiteAccountAmeDeletePopupComponent {
    @Output() ameDeleted = new EventEmitter<number>();

    @Input() ameId;
    @Input() ameCreatedDate;

    constructor(public activeModal: NgbActiveModal, public siteAccountService: SiteAccountService) {}

    confirmDelete(id: number) {
        this.activeModal.dismiss(true);
        this.ameDeleted.emit(id);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}
