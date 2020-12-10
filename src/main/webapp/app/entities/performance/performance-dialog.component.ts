import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Performance } from './performance.model';
import { PerformancePopupService } from './performance-popup.service';
import { PerformanceService } from './performance.service';
import { BudderflyInvoice, BudderflyInvoiceService } from '../budderfly-invoice';

@Component({
    selector: 'jhi-performance-dialog',
    templateUrl: './performance-dialog.component.html'
})
export class PerformanceDialogComponent implements OnInit {
    performance: Performance;
    isSaving: boolean;

    budderflyinvoices: BudderflyInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private performanceService: PerformanceService,
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
        if (this.performance.id !== undefined) {
            this.subscribeToSaveResponse(this.performanceService.update(this.performance));
        } else {
            this.subscribeToSaveResponse(this.performanceService.create(this.performance));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Performance>>) {
        result.subscribe((res: HttpResponse<Performance>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Performance) {
        this.eventManager.broadcast({ name: 'performanceListModification', content: 'OK' });
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
    selector: 'jhi-performance-popup',
    template: ''
})
export class PerformancePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private performancePopupService: PerformancePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.performancePopupService.open(PerformanceDialogComponent as Component, params['id']);
            } else {
                this.performancePopupService.open(PerformanceDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
