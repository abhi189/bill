import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillingCycleActivity } from './billing-cycle-activity.model';
import { BillingCycleActivityPopupService } from './billing-cycle-activity-popup.service';
import { BillingCycleActivityService } from './billing-cycle-activity.service';
import { BillingCycle, BillingCycleService } from '../billing-cycle';

@Component({
    selector: 'jhi-billing-cycle-activity-dialog',
    templateUrl: './billing-cycle-activity-dialog.component.html'
})
export class BillingCycleActivityDialogComponent implements OnInit {
    billingCycleActivity: BillingCycleActivity;
    isSaving: boolean;

    billingcycles: BillingCycle[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billingCycleActivityService: BillingCycleActivityService,
        private billingCycleService: BillingCycleService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.billingCycleService.query().subscribe(
            (res: HttpResponse<BillingCycle[]>) => {
                this.billingcycles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.billingCycleActivity.id !== undefined) {
            this.subscribeToSaveResponse(this.billingCycleActivityService.update(this.billingCycleActivity));
        } else {
            this.subscribeToSaveResponse(this.billingCycleActivityService.create(this.billingCycleActivity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillingCycleActivity>>) {
        result.subscribe(
            (res: HttpResponse<BillingCycleActivity>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: BillingCycleActivity) {
        this.eventManager.broadcast({ name: 'billingCycleActivityListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBillingCycleById(index: number, item: BillingCycle) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-billing-cycle-activity-popup',
    template: ''
})
export class BillingCycleActivityPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private billingCycleActivityPopupService: BillingCycleActivityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.billingCycleActivityPopupService.open(BillingCycleActivityDialogComponent as Component, params['id']);
            } else {
                this.billingCycleActivityPopupService.open(BillingCycleActivityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
