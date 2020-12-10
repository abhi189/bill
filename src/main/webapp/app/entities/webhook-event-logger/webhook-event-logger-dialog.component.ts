import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WebhookEventLogger } from './webhook-event-logger.model';
import { WebhookEventLoggerPopupService } from './webhook-event-logger-popup.service';
import { WebhookEventLoggerService } from './webhook-event-logger.service';

@Component({
    selector: 'jhi-webhook-event-logger-dialog',
    templateUrl: './webhook-event-logger-dialog.component.html'
})
export class WebhookEventLoggerDialogComponent implements OnInit {
    webhookEventLogger: WebhookEventLogger;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private webhookEventLoggerService: WebhookEventLoggerService,
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
        if (this.webhookEventLogger.id !== undefined) {
            this.subscribeToSaveResponse(this.webhookEventLoggerService.update(this.webhookEventLogger));
        } else {
            this.subscribeToSaveResponse(this.webhookEventLoggerService.create(this.webhookEventLogger));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WebhookEventLogger>>) {
        result.subscribe(
            (res: HttpResponse<WebhookEventLogger>) => this.onSaveSuccess(res.body),
            (res: HttpErrorResponse) => this.onSaveError()
        );
    }

    private onSaveSuccess(result: WebhookEventLogger) {
        this.eventManager.broadcast({ name: 'webhookEventLoggerListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-webhook-event-logger-popup',
    template: ''
})
export class WebhookEventLoggerPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private webhookEventLoggerPopupService: WebhookEventLoggerPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.webhookEventLoggerPopupService.open(WebhookEventLoggerDialogComponent as Component, params['id']);
            } else {
                this.webhookEventLoggerPopupService.open(WebhookEventLoggerDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
