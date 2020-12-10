import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Charge } from './charge.model';
import { ChargePopupService } from './charge-popup.service';
import { ChargeService } from './charge.service';
import { Invoice, InvoiceService } from '../invoice';

@Component({
    selector: 'jhi-charge-dialog',
    templateUrl: './charge-dialog.component.html'
})
export class ChargeDialogComponent implements OnInit {
    charge: Charge;
    isSaving: boolean;

    invoices: Invoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private chargeService: ChargeService,
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
        if (this.charge.id !== undefined) {
            this.subscribeToSaveResponse(this.chargeService.update(this.charge));
        } else {
            this.subscribeToSaveResponse(this.chargeService.create(this.charge));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Charge>>) {
        result.subscribe((res: HttpResponse<Charge>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Charge) {
        this.eventManager.broadcast({ name: 'chargeListModification', content: 'OK' });
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
    selector: 'jhi-charge-popup',
    template: ''
})
export class ChargePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private chargePopupService: ChargePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.chargePopupService.open(ChargeDialogComponent as Component, params['id']);
            } else {
                this.chargePopupService.open(ChargeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
