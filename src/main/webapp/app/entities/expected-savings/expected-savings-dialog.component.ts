import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ExpectedSavings } from './expected-savings.model';
import { ExpectedSavingsPopupService } from './expected-savings-popup.service';
import { ExpectedSavingsService } from './expected-savings.service';

@Component({
    selector: 'jhi-expected-savings-dialog',
    templateUrl: './expected-savings-dialog.component.html'
})
export class ExpectedSavingsDialogComponent implements OnInit {
    expectedSavings: ExpectedSavings;
    solutionOptions = [];
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private expectedSavingsService: ExpectedSavingsService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.expectedSavingsService.getExpectedSavingsSolutions().subscribe(res => (this.solutionOptions = res.body));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.expectedSavings.id !== undefined) {
            this.subscribeToSaveResponse(this.expectedSavingsService.update(this.expectedSavings));
        } else {
            this.subscribeToSaveResponse(this.expectedSavingsService.create(this.expectedSavings));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ExpectedSavings>>) {
        result.subscribe(
            (res: HttpResponse<ExpectedSavings>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: ExpectedSavings) {
        this.eventManager.broadcast({ name: 'expectedSavingsListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-expected-savings-popup',
    template: ''
})
export class ExpectedSavingsPopupComponent implements OnInit, OnDestroy {
    routeSub: any;
    customerType: string;

    constructor(private route: ActivatedRoute, private expectedSavingsPopupService: ExpectedSavingsPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['customerType']) {
                console.log('PARAMS: ' + params['customerType']);
                this.customerType = params['customerType'];
            }
            if (params['id']) {
                this.expectedSavingsPopupService.open(ExpectedSavingsDialogComponent as Component, params['id']);
            } else {
                this.expectedSavingsPopupService.open(ExpectedSavingsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
