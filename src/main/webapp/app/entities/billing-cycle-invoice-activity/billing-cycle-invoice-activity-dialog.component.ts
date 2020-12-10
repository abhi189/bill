import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BillingCycleInvoiceActivity } from './billing-cycle-invoice-activity.model';
import { BillingCycleInvoiceActivityPopupService } from './billing-cycle-invoice-activity-popup.service';
import { BillingCycleInvoiceActivityService } from './billing-cycle-invoice-activity.service';
import { BudderflyInvoice, BudderflyInvoiceService } from '../budderfly-invoice';

@Component({
    selector: 'jhi-billing-cycle-invoice-activity-dialog',
    templateUrl: './billing-cycle-invoice-activity-dialog.component.html'
})
export class BillingCycleInvoiceActivityDialogComponent implements OnInit {
    billingCycleInvoiceActivity: BillingCycleInvoiceActivity;
    isSaving: boolean;

    budderflyinvoices: BudderflyInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private billingCycleInvoiceActivityService: BillingCycleInvoiceActivityService,
        private budderflyInvoiceService: BudderflyInvoiceService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.budderflyInvoiceService.query().subscribe(
            (res: HttpResponse<BudderflyInvoice[]>) => {
                this.budderflyinvoices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.billingCycleInvoiceActivity.id !== undefined) {
            this.subscribeToSaveResponse(this.billingCycleInvoiceActivityService.update(this.billingCycleInvoiceActivity));
        } else {
            this.subscribeToSaveResponse(this.billingCycleInvoiceActivityService.create(this.billingCycleInvoiceActivity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BillingCycleInvoiceActivity>>) {
        result.subscribe(
            (res: HttpResponse<BillingCycleInvoiceActivity>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: BillingCycleInvoiceActivity) {
        this.eventManager.broadcast({ name: 'billingCycleInvoiceActivityListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackBudderflyInvoiceById(index: number, item: BudderflyInvoice) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-billing-cycle-invoice-activity-popup',
    template: ''
})
export class BillingCycleInvoiceActivityPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private billingCycleInvoiceActivityPopupService: BillingCycleInvoiceActivityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.billingCycleInvoiceActivityPopupService.open(BillingCycleInvoiceActivityDialogComponent as Component, params['id']);
            } else {
                this.billingCycleInvoiceActivityPopupService.open(BillingCycleInvoiceActivityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
