import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MissingInvoice } from './missing-invoice.model';
import { MissingInvoicePopupService } from './missing-invoice-popup.service';
import { MissingInvoiceService } from './missing-invoice.service';
import { SiteAccount, SiteAccountService } from '../site-account';

@Component({
    selector: 'jhi-missing-invoice-dialog',
    templateUrl: './missing-invoice-dialog.component.html'
})
export class MissingInvoiceDialogComponent implements OnInit {
    missingInvoice: MissingInvoice;
    isSaving: boolean;

    siteaccounts: SiteAccount[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private missingInvoiceService: MissingInvoiceService,
        private siteAccountService: SiteAccountService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.siteAccountService.query().subscribe(
            (res: HttpResponse<SiteAccount[]>) => {
                this.siteaccounts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.missingInvoice.id !== undefined) {
            this.subscribeToSaveResponse(this.missingInvoiceService.update(this.missingInvoice));
        } else {
            this.subscribeToSaveResponse(this.missingInvoiceService.create(this.missingInvoice));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MissingInvoice>>) {
        result.subscribe(
            (res: HttpResponse<MissingInvoice>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: MissingInvoice) {
        this.eventManager.broadcast({ name: 'missingInvoiceListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackSiteAccountById(index: number, item: SiteAccount) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-missing-invoice-popup',
    template: ''
})
export class MissingInvoicePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private missingInvoicePopupService: MissingInvoicePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.missingInvoicePopupService.open(MissingInvoiceDialogComponent as Component, params['id']);
            } else {
                this.missingInvoicePopupService.open(MissingInvoiceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
