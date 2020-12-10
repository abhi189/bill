import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Tax } from './tax.model';
import { TaxPopupService } from './tax-popup.service';
import { TaxService } from './tax.service';

@Component({
    selector: 'jhi-tax-dialog',
    templateUrl: './tax-dialog.component.html'
})
export class TaxDialogComponent implements OnInit {
    tax: Tax;
    isSaving: boolean;
    vadidFromDp: any;
    validToDp: any;
    createdDateDp: any;
    editedDateDp: any;

    constructor(public activeModal: NgbActiveModal, private taxService: TaxService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.tax.id !== undefined) {
            this.subscribeToSaveResponse(this.taxService.update(this.tax));
        } else {
            this.subscribeToSaveResponse(this.taxService.create(this.tax));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Tax>>) {
        result.subscribe((res: HttpResponse<Tax>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Tax) {
        this.eventManager.broadcast({ name: 'taxListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-tax-popup',
    template: ''
})
export class TaxPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private taxPopupService: TaxPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.taxPopupService.open(TaxDialogComponent as Component, params['id']);
            } else {
                this.taxPopupService.open(TaxDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
