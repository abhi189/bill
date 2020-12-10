import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExcludedRate } from './excluded-rate.model';
import { ExcludedRatePopupService } from './excluded-rate-popup.service';
import { ExcludedRateService } from './excluded-rate.service';

@Component({
    selector: 'jhi-excluded-rate-dialog',
    templateUrl: './excluded-rate-dialog.component.html'
})
export class ExcludedRateDialogComponent implements OnInit {
    excludedRate: ExcludedRate;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private excludedRateService: ExcludedRateService,
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
        if (this.excludedRate.id !== undefined) {
            this.subscribeToSaveResponse(this.excludedRateService.update(this.excludedRate));
        } else {
            this.subscribeToSaveResponse(this.excludedRateService.create(this.excludedRate));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExcludedRate>>) {
        result.subscribe((res: HttpResponse<ExcludedRate>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ExcludedRate) {
        this.eventManager.broadcast({ name: 'excludedRateListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-excluded-rate-popup',
    template: ''
})
export class ExcludedRatePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private excludedRatePopupService: ExcludedRatePopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.excludedRatePopupService.open(ExcludedRateDialogComponent as Component, params['id']);
            } else {
                this.excludedRatePopupService.open(ExcludedRateDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
