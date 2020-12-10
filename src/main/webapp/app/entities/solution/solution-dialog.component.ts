import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Solution } from './solution.model';
import { SolutionPopupService } from './solution-popup.service';
import { SolutionService } from './solution.service';
import { BudderflyInvoice, BudderflyInvoiceService } from '../budderfly-invoice';

@Component({
    selector: 'jhi-solution-dialog',
    templateUrl: './solution-dialog.component.html'
})
export class SolutionDialogComponent implements OnInit {
    solution: Solution;
    isSaving: boolean;

    budderflyinvoices: BudderflyInvoice[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private solutionService: SolutionService,
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
        if (this.solution.id !== undefined) {
            this.subscribeToSaveResponse(this.solutionService.update(this.solution));
        } else {
            this.subscribeToSaveResponse(this.solutionService.create(this.solution));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Solution>>) {
        result.subscribe((res: HttpResponse<Solution>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Solution) {
        this.eventManager.broadcast({ name: 'solutionListModification', content: 'OK' });
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
    selector: 'jhi-solution-popup',
    template: ''
})
export class SolutionPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private solutionPopupService: SolutionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.solutionPopupService.open(SolutionDialogComponent as Component, params['id']);
            } else {
                this.solutionPopupService.open(SolutionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
