import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WebhookEventLogger } from './webhook-event-logger.model';
import { WebhookEventLoggerService } from './webhook-event-logger.service';

@Component({
    selector: 'jhi-webhook-event-logger-detail',
    templateUrl: './webhook-event-logger-detail.component.html'
})
export class WebhookEventLoggerDetailComponent implements OnInit, OnDestroy {
    webhookEventLogger: WebhookEventLogger;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private webhookEventLoggerService: WebhookEventLoggerService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInWebhookEventLoggers();
    }

    load(id) {
        this.webhookEventLoggerService.find(id).subscribe((webhookEventLoggerResponse: HttpResponse<WebhookEventLogger>) => {
            this.webhookEventLogger = webhookEventLoggerResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWebhookEventLoggers() {
        this.eventSubscriber = this.eventManager.subscribe('webhookEventLoggerListModification', response =>
            this.load(this.webhookEventLogger.id)
        );
    }
}
