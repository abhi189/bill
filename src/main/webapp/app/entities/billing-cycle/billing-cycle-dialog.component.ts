import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { BillingCycle } from './billing-cycle.model';
import { BillingCyclePopupService } from './billing-cycle-popup.service';
import { BillingCycleService } from './billing-cycle.service';

@Component({
    selector: 'jhi-billing-cycle-dialog',
    templateUrl: './billing-cycle-dialog.component.html'
})
export class BillingCycleDialogComponent implements OnInit {
    billingCycle: BillingCycle;
    isSaving: boolean;
    dueDateDp: any;
    statementDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private billingCycleService: BillingCycleService,
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
        if (this.billingCycle.id !== undefined) {
            this.subscribeToSaveResponse(this.billingCycleService.update(this.billingCycle));
        } else {
            this.subscribeToSaveResponse(this.billingCycleService.create(this.billingCycle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillingCycle>>) {
        result.subscribe((res: HttpResponse<BillingCycle>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: BillingCycle) {
        this.eventManager.broadcast({ name: 'billingCycleListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-billing-cycle-popup',
    template: ''
})
export class BillingCyclePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private billingCyclePopupService: BillingCyclePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.billingCyclePopupService.open(BillingCycleDialogComponent as Component, params['id']);
            } else {
                this.billingCyclePopupService.open(BillingCycleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
