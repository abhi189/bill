import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Adjustment } from './adjustment.model';
import { AdjustmentPopupService } from './adjustment-popup.service';
import { AdjustmentService } from './adjustment.service';

@Component({
    selector: 'jhi-adjustment-dialog',
    templateUrl: './adjustment-dialog.component.html'
})
export class AdjustmentDialogComponent implements OnInit {
    adjustment: Adjustment;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private adjustmentService: AdjustmentService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.adjustment.id !== undefined) {
            this.subscribeToSaveResponse(this.adjustmentService.update(this.adjustment));
        } else {
            this.subscribeToSaveResponse(this.adjustmentService.create(this.adjustment));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Adjustment>>) {
        result.subscribe((res: HttpResponse<Adjustment>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Adjustment) {
        this.eventManager.broadcast({ name: 'adjustmentListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-adjustment-popup',
    template: ''
})
export class AdjustmentPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private adjustmentPopupService: AdjustmentPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.adjustmentPopupService.open(AdjustmentDialogComponent as Component, params['id']);
            } else {
                this.adjustmentPopupService.open(AdjustmentDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
