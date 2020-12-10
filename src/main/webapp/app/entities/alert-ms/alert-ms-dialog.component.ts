import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AlertMs } from './alert-ms.model';
import { AlertMsPopupService } from './alert-ms-popup.service';
import { AlertMsService } from './alert-ms.service';

@Component({
    selector: 'jhi-alert-ms-dialog',
    templateUrl: './alert-ms-dialog.component.html'
})
export class AlertMsDialogComponent implements OnInit {
    alertMs: AlertMs;
    isSaving: boolean;

    constructor(public activeModal: NgbActiveModal, private alertMsService: AlertMsService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.alertMs.id !== undefined) {
            this.subscribeToSaveResponse(this.alertMsService.update(this.alertMs));
        } else {
            this.subscribeToSaveResponse(this.alertMsService.create(this.alertMs));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AlertMs>>) {
        result.subscribe((res: HttpResponse<AlertMs>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AlertMs) {
        this.eventManager.broadcast({ name: 'alertMsListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-alert-ms-popup',
    template: ''
})
export class AlertMsPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private alertMsPopupService: AlertMsPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.alertMsPopupService.open(AlertMsDialogComponent as Component, params['id']);
            } else {
                this.alertMsPopupService.open(AlertMsDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
