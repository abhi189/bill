import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StagingCharge } from './staging-charge.model';
import { StagingChargePopupService } from './staging-charge-popup.service';
import { StagingChargeService } from './staging-charge.service';
import { StagingInvoice, StagingInvoiceService } from '../staging-invoice';
import { StagingMeter, StagingMeterService } from '../staging-meter';

@Component({
    selector: 'jhi-staging-charge-dialog',
    templateUrl: './staging-charge-dialog.component.html'
})
export class StagingChargeDialogComponent implements OnInit {
    stagingCharge: StagingCharge;
    isSaving: boolean;

    staginginvoices: StagingInvoice[];

    stagingmeters: StagingMeter[];
    intervalStartDp: any;
    intervalEndDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stagingChargeService: StagingChargeService,
        private stagingInvoiceService: StagingInvoiceService,
        private stagingMeterService: StagingMeterService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.stagingInvoiceService.query().subscribe(
            (res: HttpResponse<StagingInvoice[]>) => {
                this.staginginvoices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.stagingMeterService.query().subscribe(
            (res: HttpResponse<StagingMeter[]>) => {
                this.stagingmeters = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stagingCharge.id !== undefined) {
            this.subscribeToSaveResponse(this.stagingChargeService.update(this.stagingCharge));
        } else {
            this.subscribeToSaveResponse(this.stagingChargeService.create(this.stagingCharge));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StagingCharge>>) {
        result.subscribe(
            (res: HttpResponse<StagingCharge>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: StagingCharge) {
        this.eventManager.broadcast({ name: 'stagingChargeListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackStagingInvoiceById(index: number, item: StagingInvoice) {
        return item.id;
    }

    trackStagingMeterById(index: number, item: StagingMeter) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-staging-charge-popup',
    template: ''
})
export class StagingChargePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingChargePopupService: StagingChargePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.stagingChargePopupService.open(StagingChargeDialogComponent as Component, params['id']);
            } else {
                this.stagingChargePopupService.open(StagingChargeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
