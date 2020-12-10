import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Alert } from './alert.model';
import { AlertService } from './alert.service';

@Component({
    selector: 'jhi-alert-detail',
    templateUrl: './alert-detail.component.html'
})
export class AlertDetailComponent implements OnInit, OnDestroy {
    alert: Alert;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private alertService: AlertService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAlerts();
    }

    load(id) {
        this.alertService.find(id).subscribe((alertResponse: HttpResponse<Alert>) => {
            this.alert = alertResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlerts() {
        this.eventSubscriber = this.eventManager.subscribe('alertListModification', response => this.load(this.alert.id));
    }
}
