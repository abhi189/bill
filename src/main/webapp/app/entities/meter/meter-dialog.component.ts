import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Meter } from '../invoice/invoice.model';
import { MeterPopupService } from './meter-popup.service';
import { MeterService } from './meter.service';
import { BudderflyInvoice, BudderflyInvoiceService } from '../budderfly-invoice';

@Component({
    selector: 'jhi-meter-dialog',
    templateUrl: './meter-dialog.component.html'
})
export class MeterDialogComponent implements OnInit {
    meter: Meter;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private meterService: MeterService,
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
        if (this.meter.id !== undefined) {
            this.subscribeToSaveResponse(this.meterService.update(this.meter));
        } else {
            this.subscribeToSaveResponse(this.meterService.create(this.meter));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Meter>>) {
        result.subscribe((res: HttpResponse<Meter>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Meter) {
        this.eventManager.broadcast({ name: 'meterListModification', content: 'OK' });
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
    selector: 'jhi-meter-popup',
    template: ''
})
export class MeterPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private solutionPopupService: MeterPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.solutionPopupService.open(MeterDialogComponent as Component, params['id']);
            } else {
                this.solutionPopupService.open(MeterDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
