import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { BudderflyInvoice } from './budderfly-invoice.model';
import { BudderflyInvoicePopupService } from './budderfly-invoice-popup.service';
import { BudderflyInvoiceService } from './budderfly-invoice.service';
import { BillingCycle, BillingCycleService } from '../billing-cycle';

@Component({
    selector: 'jhi-budderfly-invoice-dialog',
    templateUrl: './budderfly-invoice-dialog.component.html'
})
export class BudderflyInvoiceDialogComponent implements OnInit {
    budderflyInvoice: BudderflyInvoice;
    isSaving: boolean;

    billingcycles: BillingCycle[];
    lastInvoiceDp: any;
    LEDInstallDateDp: any;
    accountTakeOverDateDp: any;
    startDateDp: any;
    endDateDp: any;
    statementDateDp: any;
    dueDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private budderflyInvoiceService: BudderflyInvoiceService,
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
        if (this.budderflyInvoice.id !== undefined) {
            this.subscribeToSaveResponse(this.budderflyInvoiceService.update(this.budderflyInvoice));
        } else {
            this.subscribeToSaveResponse(this.budderflyInvoiceService.create(this.budderflyInvoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<BudderflyInvoice>>) {
        result.subscribe(
            (res: HttpResponse<BudderflyInvoice>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: BudderflyInvoice) {
        this.eventManager.broadcast({ name: 'budderflyInvoiceListModification', content: 'OK' });
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
    selector: 'jhi-budderfly-invoice-popup',
    template: ''
})
export class BudderflyInvoicePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private budderflyInvoicePopupService: BudderflyInvoicePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.budderflyInvoicePopupService.open(BudderflyInvoiceDialogComponent as Component, params['id']);
            } else {
                this.budderflyInvoicePopupService.open(BudderflyInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
