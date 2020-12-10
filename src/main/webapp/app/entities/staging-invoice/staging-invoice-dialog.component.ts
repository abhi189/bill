import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StagingInvoice } from './staging-invoice.model';
import { StagingInvoicePopupService } from './staging-invoice-popup.service';
import { StagingInvoiceService } from './staging-invoice.service';

@Component({
    selector: 'jhi-staging-invoice-dialog',
    templateUrl: './staging-invoice-dialog.component.html'
})
export class StagingInvoiceDialogComponent implements OnInit {
    stagingInvoice: StagingInvoice;
    isSaving: boolean;
    intervalStartDp: any;
    intervalEndDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private stagingInvoiceService: StagingInvoiceService,
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
        if (this.stagingInvoice.id !== undefined) {
            this.subscribeToSaveResponse(this.stagingInvoiceService.update(this.stagingInvoice));
        } else {
            this.subscribeToSaveResponse(this.stagingInvoiceService.create(this.stagingInvoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StagingInvoice>>) {
        result.subscribe(
            (res: HttpResponse<StagingInvoice>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: StagingInvoice) {
        this.eventManager.broadcast({ name: 'stagingInvoiceListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-staging-invoice-popup',
    template: ''
})
export class StagingInvoicePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private stagingInvoicePopupService: StagingInvoicePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.stagingInvoicePopupService.open(StagingInvoiceDialogComponent as Component, params['id']);
            } else {
                this.stagingInvoicePopupService.open(StagingInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
