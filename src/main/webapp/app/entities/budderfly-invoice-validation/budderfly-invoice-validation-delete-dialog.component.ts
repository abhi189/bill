import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BudderflyInvoiceValidation } from './budderfly-invoice-validation.model';
import { BudderflyInvoiceValidationPopupService } from './budderfly-invoice-validation-popup.service';
import { BudderflyInvoiceValidationService } from './budderfly-invoice-validation.service';

@Component({
    selector: 'jhi-budderfly-invoice-validation-delete-dialog',
    templateUrl: './budderfly-invoice-validation-delete-dialog.component.html'
})
export class BudderflyInvoiceValidationDeleteDialogComponent {
    budderflyInvoiceValidation: BudderflyInvoiceValidation;

    constructor(
        private budderflyInvoiceValidationService: BudderflyInvoiceValidationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.budderflyInvoiceValidationService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'budderflyInvoiceValidationListModification',
                content: 'Deleted an budderflyInvoiceValidation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-budderfly-invoice-validation-delete-popup',
    template: ''
})
export class BudderflyInvoiceValidationDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private budderflyInvoiceValidationPopupService: BudderflyInvoiceValidationPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.budderflyInvoiceValidationPopupService.open(BudderflyInvoiceValidationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
