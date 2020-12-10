import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiDataUtils } from 'ng-jhipster';

import { AlertActivity } from './alert-activity.model';
import { AlertActivityService } from './alert-activity.service';

@Component({
    selector: 'jhi-alert-activity-detail',
    templateUrl: './alert-activity-detail.component.html'
})
export class AlertActivityDetailComponent implements OnInit, OnDestroy {
    alertActivity: AlertActivity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private dataUtils: JhiDataUtils,
        private alertActivityService: AlertActivityService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAlertActivities();
    }

    load(id) {
        this.alertActivityService.find(id).subscribe((alertActivityResponse: HttpResponse<AlertActivity>) => {
            this.alertActivity = alertActivityResponse.body;
        });
    }
    byteSize(field) {
        return this.dataUtils.byteSize(field);
    }

    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAlertActivities() {
        this.eventSubscriber = this.eventManager.subscribe('alertActivityListModification', response => this.load(this.alertActivity.id));
    }
}
