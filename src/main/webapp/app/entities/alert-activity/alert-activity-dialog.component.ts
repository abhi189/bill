import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';

import { AlertActivity } from './alert-activity.model';
import { AlertActivityPopupService } from './alert-activity-popup.service';
import { AlertActivityService } from './alert-activity.service';
import { Alert, AlertService } from '../alert';

@Component({
    selector: 'jhi-alert-activity-dialog',
    templateUrl: './alert-activity-dialog.component.html'
})
export class AlertActivityDialogComponent implements OnInit {
    alertActivity: AlertActivity;
    isSaving: boolean;

    alerts: Alert[];

    constructor(
        public activeModal: NgbActiveModal,
        private dataUtils: JhiDataUtils,
        private jhiAlertService: JhiAlertService,
        private alertActivityService: AlertActivityService,
        private alertService: AlertService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.alertService.query().subscribe(
            (res: HttpResponse<Alert[]>) => {
                this.alerts = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.alertActivity.id !== undefined) {
            this.subscribeToSaveResponse(this.alertActivityService.update(this.alertActivity));
        } else {
            this.subscribeToSaveResponse(this.alertActivityService.create(this.alertActivity));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AlertActivity>>) {
        result.subscribe(
            (res: HttpResponse<AlertActivity>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: AlertActivity) {
        this.eventManager.broadcast({ name: 'alertActivityListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAlertById(index: number, item: Alert) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-alert-activity-popup',
    template: ''
})
export class AlertActivityPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertActivityPopupService: AlertActivityPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.alertActivityPopupService.open(AlertActivityDialogComponent as Component, params['id']);
            } else {
                this.alertActivityPopupService.open(AlertActivityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
