import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { BudderflyInvoiceValidation } from './budderfly-invoice-validation.model';
import { BudderflyInvoiceValidationPopupService } from './budderfly-invoice-validation-popup.service';
import { BudderflyInvoiceValidationService } from './budderfly-invoice-validation.service';

@Component({
    selector: 'jhi-budderfly-invoice-validation-dialog',
    templateUrl: './budderfly-invoice-validation-dialog.component.html'
})
export class BudderflyInvoiceValidationDialogComponent implements OnInit {
    budderflyInvoiceValidation: BudderflyInvoiceValidation;
    isSaving: boolean;
    endpoints: any;
    isReadonly: any;

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private budderflyInvoiceValidationService: BudderflyInvoiceValidationService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.isReadonly = this.budderflyInvoiceValidation.id != null;
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.budderflyInvoiceValidation.id !== undefined) {
            this.subscribeToSaveResponse(this.budderflyInvoiceValidationService.update(this.budderflyInvoiceValidation));
        } else {
            this.subscribeToSaveResponse(this.budderflyInvoiceValidationService.create(this.budderflyInvoiceValidation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BudderflyInvoiceValidation>>) {
        result.subscribe(
            (res: HttpResponse<BudderflyInvoiceValidation>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: BudderflyInvoiceValidation) {
        this.eventManager.broadcast({ name: 'budderflyInvoiceValidationListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-budderfly-invoice-validation-popup',
    template: ''
})
export class BudderflyInvoiceValidationPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private budderflyInvoiceValidationPopupService: BudderflyInvoiceValidationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.budderflyInvoiceValidationPopupService.open(BudderflyInvoiceValidationDialogComponent as Component, params['id']);
            } else {
                this.budderflyInvoiceValidationPopupService.open(BudderflyInvoiceValidationDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
