import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillingCycleActivity } from './billing-cycle-activity.model';
import { BillingCycleActivityPopupService } from './billing-cycle-activity-popup.service';
import { BillingCycleActivityService } from './billing-cycle-activity.service';

@Component({
    selector: 'jhi-billing-cycle-activity-delete-dialog',
    templateUrl: './billing-cycle-activity-delete-dialog.component.html'
})
export class BillingCycleActivityDeleteDialogComponent {
    billingCycleActivity: BillingCycleActivity;

    constructor(
        private billingCycleActivityService: BillingCycleActivityService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.billingCycleActivityService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'billingCycleActivityListModification',
                content: 'Deleted an billingCycleActivity'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-billing-cycle-activity-delete-popup',
    template: ''
})
export class BillingCycleActivityDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private billingCycleActivityPopupService: BillingCycleActivityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.billingCycleActivityPopupService.open(BillingCycleActivityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
