import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StagingConsumption } from './staging-consumption.model';
import { StagingConsumptionPopupService } from './staging-consumption-popup.service';
import { StagingConsumptionService } from './staging-consumption.service';
import { StagingInvoice, StagingInvoiceService } from '../staging-invoice';
import { StagingMeter, StagingMeterService } from '../staging-meter';

@Component({
    selector: 'jhi-staging-consumption-dialog',
    templateUrl: './staging-consumption-dialog.component.html'
})
export class StagingConsumptionDialogComponent implements OnInit {
    stagingConsumption: StagingConsumption;
    isSaving: boolean;

    staginginvoices: StagingInvoice[];

    stagingmeters: StagingMeter[];
    intervalStartDp: any;
    intervalEndDp: any;
    meterReadDateDp: any;
    previousMeterReadDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stagingConsumptionService: StagingConsumptionService,
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
        if (this.stagingConsumption.id !== undefined) {
            this.subscribeToSaveResponse(this.stagingConsumptionService.update(this.stagingConsumption));
        } else {
            this.subscribeToSaveResponse(this.stagingConsumptionService.create(this.stagingConsumption));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StagingConsumption>>) {
        result.subscribe(
            (res: HttpResponse<StagingConsumption>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: StagingConsumption) {
        this.eventManager.broadcast({ name: 'stagingConsumptionListModification', content: 'OK' });
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
    selector: 'jhi-staging-consumption-popup',
    template: ''
})
export class StagingConsumptionPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingConsumptionPopupService: StagingConsumptionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.stagingConsumptionPopupService.open(StagingConsumptionDialogComponent as Component, params['id']);
            } else {
                this.stagingConsumptionPopupService.open(StagingConsumptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
