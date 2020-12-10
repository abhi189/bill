import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StagingInvoice } from './staging-invoice.model';
import { StagingInvoicePopupService } from './staging-invoice-popup.service';
import { StagingInvoiceService } from './staging-invoice.service';

@Component({
    selector: 'jhi-staging-invoice-delete-dialog',
    templateUrl: './staging-invoice-delete-dialog.component.html'
})
export class StagingInvoiceDeleteDialogComponent {
    stagingInvoice: StagingInvoice;

    constructor(
        private stagingInvoiceService: StagingInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stagingInvoiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'stagingInvoiceListModification',
                content: 'Deleted an stagingInvoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-staging-invoice-delete-popup',
    template: ''
})
export class StagingInvoiceDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingInvoicePopupService: StagingInvoicePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.stagingInvoicePopupService.open(StagingInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
