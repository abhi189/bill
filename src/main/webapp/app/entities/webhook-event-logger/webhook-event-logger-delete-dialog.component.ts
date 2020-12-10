import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WebhookEventLogger } from './webhook-event-logger.model';
import { WebhookEventLoggerPopupService } from './webhook-event-logger-popup.service';
import { WebhookEventLoggerService } from './webhook-event-logger.service';

@Component({
    selector: 'jhi-webhook-event-logger-delete-dialog',
    templateUrl: './webhook-event-logger-delete-dialog.component.html'
})
export class WebhookEventLoggerDeleteDialogComponent {
    webhookEventLogger: WebhookEventLogger;

    constructor(
        private webhookEventLoggerService: WebhookEventLoggerService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.webhookEventLoggerService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'webhookEventLoggerListModification',
                content: 'Deleted an webhookEventLogger'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-webhook-event-logger-delete-popup',
    template: ''
})
export class WebhookEventLoggerDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private webhookEventLoggerPopupService: WebhookEventLoggerPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.webhookEventLoggerPopupService.open(WebhookEventLoggerDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
