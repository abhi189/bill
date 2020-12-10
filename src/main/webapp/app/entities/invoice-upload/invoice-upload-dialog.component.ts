import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceUpload } from './invoice-upload.model';
import { InvoiceUploadPopupService } from './invoice-upload-popup.service';
import { InvoiceUploadService } from './invoice-upload.service';

@Component({
    selector: 'jhi-invoice-upload-dialog',
    templateUrl: './invoice-upload-dialog.component.html'
})
export class InvoiceUploadDialogComponent implements OnInit {
    invoiceUpload: InvoiceUpload;

    selectedFiles: FileList;
    currentFileUpload: File;

    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private invoiceUploadService: InvoiceUploadService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        this.currentFileUpload = this.selectedFiles.item(0);
        this.subscribeToSaveResponse(this.invoiceUploadService.create(this.currentFileUpload));
        this.selectedFiles = undefined;
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<InvoiceUpload>>) {
        result.subscribe(
            (res: HttpResponse<InvoiceUpload>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: InvoiceUpload) {
        this.eventManager.broadcast({ name: 'invoiceUploadListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    onFileChange(ev) {
        this.selectedFiles = ev.target.files;
    }
}

@Component({
    selector: 'jhi-invoice-upload-popup',
    template: ''
})
export class InvoiceUploadPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private invoiceUploadPopupService: InvoiceUploadPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.invoiceUploadPopupService.open(InvoiceUploadDialogComponent as Component);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
