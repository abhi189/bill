import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Consumption } from './consumption.model';
import { ConsumptionPopupService } from './consumption-popup.service';
import { ConsumptionService } from './consumption.service';
import { Invoice, InvoiceService } from '../invoice';

@Component({
    selector: 'jhi-consumption-dialog',
    templateUrl: './consumption-dialog.component.html'
})
export class ConsumptionDialogComponent implements OnInit {
    consumption: Consumption;
    isSaving: boolean;

    invoices: Invoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private consumptionService: ConsumptionService,
        private invoiceService: InvoiceService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.invoiceService.query().subscribe(
            (res: HttpResponse<Invoice[]>) => {
                this.invoices = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.consumption.id !== undefined) {
            this.subscribeToSaveResponse(this.consumptionService.update(this.consumption));
        } else {
            this.subscribeToSaveResponse(this.consumptionService.create(this.consumption));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Consumption>>) {
        result.subscribe((res: HttpResponse<Consumption>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Consumption) {
        this.eventManager.broadcast({ name: 'consumptionListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackInvoiceById(index: number, item: Invoice) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-consumption-popup',
    template: ''
})
export class ConsumptionPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private consumptionPopupService: ConsumptionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.consumptionPopupService.open(ConsumptionDialogComponent as Component, params['id']);
            } else {
                this.consumptionPopupService.open(ConsumptionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
