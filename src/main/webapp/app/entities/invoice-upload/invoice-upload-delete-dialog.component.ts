import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { InvoiceUpload } from './invoice-upload.model';
import { InvoiceUploadPopupService } from './invoice-upload-popup.service';
import { InvoiceUploadService } from './invoice-upload.service';

@Component({
    selector: 'jhi-invoice-upload-delete-dialog',
    templateUrl: './invoice-upload-delete-dialog.component.html'
})
export class InvoiceUploadDeleteDialogComponent {
    invoiceUpload: InvoiceUpload;

    constructor(
        private invoiceUploadService: InvoiceUploadService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.invoiceUploadService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'invoiceUploadListModification',
                content: 'Deleted an invoiceUpload'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-invoice-upload-delete-popup',
    template: ''
})
export class InvoiceUploadDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private invoiceUploadPopupService: InvoiceUploadPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.invoiceUploadPopupService.open(InvoiceUploadDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
