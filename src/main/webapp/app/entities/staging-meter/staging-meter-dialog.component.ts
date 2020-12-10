import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StagingMeter } from './staging-meter.model';
import { StagingMeterPopupService } from './staging-meter-popup.service';
import { StagingMeterService } from './staging-meter.service';
import { StagingInvoice, StagingInvoiceService } from '../staging-invoice';

@Component({
    selector: 'jhi-staging-meter-dialog',
    templateUrl: './staging-meter-dialog.component.html'
})
export class StagingMeterDialogComponent implements OnInit {
    stagingMeter: StagingMeter;
    isSaving: boolean;

    staginginvoices: StagingInvoice[];
    intervalStartDp: any;
    intervalEndDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stagingMeterService: StagingMeterService,
        private stagingInvoiceService: StagingInvoiceService,
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
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stagingMeter.id !== undefined) {
            this.subscribeToSaveResponse(this.stagingMeterService.update(this.stagingMeter));
        } else {
            this.subscribeToSaveResponse(this.stagingMeterService.create(this.stagingMeter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StagingMeter>>) {
        result.subscribe((res: HttpResponse<StagingMeter>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StagingMeter) {
        this.eventManager.broadcast({ name: 'stagingMeterListModification', content: 'OK' });
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
}

@Component({
    selector: 'jhi-staging-meter-popup',
    template: ''
})
export class StagingMeterPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingMeterPopupService: StagingMeterPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.stagingMeterPopupService.open(StagingMeterDialogComponent as Component, params['id']);
            } else {
                this.stagingMeterPopupService.open(StagingMeterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
