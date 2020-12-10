import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DataRetention } from './data-retention.model';
import { DataRetentionPopupService } from './data-retention-popup.service';
import { DataRetentionService } from './data-retention.service';

@Component({
    selector: 'jhi-data-retention-dialog',
    templateUrl: './data-retention-dialog.component.html'
})
export class DataRetentionDialogComponent implements OnInit {
    dataRetention: DataRetention;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private dataRetentionService: DataRetentionService,
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
        if (this.dataRetention.id !== undefined) {
            this.subscribeToSaveResponse(this.dataRetentionService.update(this.dataRetention));
        } else {
            this.subscribeToSaveResponse(this.dataRetentionService.create(this.dataRetention));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<DataRetention>>) {
        result.subscribe(
            (res: HttpResponse<DataRetention>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: DataRetention) {
        this.eventManager.broadcast({ name: 'dataRetentionListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-data-retention-popup',
    template: ''
})
export class DataRetentionPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private dataRetentionPopupService: DataRetentionPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.dataRetentionPopupService.open(DataRetentionDialogComponent as Component, params['id']);
            } else {
                this.dataRetentionPopupService.open(DataRetentionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
