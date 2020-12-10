import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillingCycle } from './billing-cycle.model';
import { BillingCyclePopupService } from './billing-cycle-popup.service';
import { BillingCycleService } from './billing-cycle.service';

@Component({
    selector: 'jhi-billing-cycle-delete-dialog',
    templateUrl: './billing-cycle-delete-dialog.component.html'
})
export class BillingCycleDeleteDialogComponent {
    billingCycle: BillingCycle;

    constructor(
        private billingCycleService: BillingCycleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billingCycleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'billingCycleListModification',
                content: 'Deleted an billingCycle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-billing-cycle-delete-popup',
    template: ''
})
export class BillingCycleDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private billingCyclePopupService: BillingCyclePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.billingCyclePopupService.open(BillingCycleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
