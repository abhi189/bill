import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillingCycleInvoiceActivity } from './billing-cycle-invoice-activity.model';
import { BillingCycleInvoiceActivityPopupService } from './billing-cycle-invoice-activity-popup.service';
import { BillingCycleInvoiceActivityService } from './billing-cycle-invoice-activity.service';

@Component({
    selector: 'jhi-billing-cycle-invoice-activity-delete-dialog',
    templateUrl: './billing-cycle-invoice-activity-delete-dialog.component.html'
})
export class BillingCycleInvoiceActivityDeleteDialogComponent {
    billingCycleInvoiceActivity: BillingCycleInvoiceActivity;

    constructor(
        private billingCycleInvoiceActivityService: BillingCycleInvoiceActivityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billingCycleInvoiceActivityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'billingCycleInvoiceActivityListModification',
                content: 'Deleted an billingCycleInvoiceActivity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-billing-cycle-invoice-activity-delete-popup',
    template: ''
})
export class BillingCycleInvoiceActivityDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private billingCycleInvoiceActivityPopupService: BillingCycleInvoiceActivityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.billingCycleInvoiceActivityPopupService.open(BillingCycleInvoiceActivityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
