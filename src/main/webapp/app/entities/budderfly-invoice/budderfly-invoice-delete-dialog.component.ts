import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BudderflyInvoice } from './budderfly-invoice.model';
import { BudderflyInvoicePopupService } from './budderfly-invoice-popup.service';
import { BudderflyInvoiceService } from './budderfly-invoice.service';

@Component({
    selector: 'jhi-budderfly-invoice-delete-dialog',
    templateUrl: './budderfly-invoice-delete-dialog.component.html'
})
export class BudderflyInvoiceDeleteDialogComponent {
    budderflyInvoice: BudderflyInvoice;

    constructor(
        private budderflyInvoiceService: BudderflyInvoiceService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.budderflyInvoiceService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'budderflyInvoiceListModification',
                content: 'Deleted an budderflyInvoice'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-budderfly-invoice-delete-popup',
    template: ''
})
export class BudderflyInvoiceDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private budderflyInvoicePopupService: BudderflyInvoicePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.budderflyInvoicePopupService.open(BudderflyInvoiceDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
