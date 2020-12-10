import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MissingInvoice } from './missing-invoice.model';
import { MissingInvoicePopupService } from './missing-invoice-popup.service';
import { MissingInvoiceService } from './missing-invoice.service';

@Component({
    selector: 'jhi-missing-invoice-delete-dialog',
    templateUrl: './missing-invoice-delete-dialog.component.html'
})
export class MissingInvoiceDeleteDialogComponent {
    missingInvoice: MissingInvoice;

    constructor(
        private missingInvoiceService: MissingInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.missingInvoiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'missingInvoiceListModification',
                content: 'Deleted an missingInvoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-missing-invoice-delete-popup',
    template: ''
})
export class MissingInvoiceDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private missingInvoicePopupService: MissingInvoicePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.missingInvoicePopupService.open(MissingInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
