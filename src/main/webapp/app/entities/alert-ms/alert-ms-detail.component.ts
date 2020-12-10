import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';

import { AlertMs } from './alert-ms.model';
import { AlertMsService } from './alert-ms.service';

@Component({
    selector: 'jhi-alert-ms-detail',
    templateUrl: './alert-ms-detail.component.html'
})
export class AlertMsDetailComponent implements OnInit, OnDestroy {
    alertMs: AlertMs;
    notesLoaded = false;
    activitiesLoaded = false;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private alertMsService: AlertMsService,
        private route: ActivatedRoute,
        private jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAlertMs();
    }

    load(id) {
        this.alertMsService.find(id).subscribe((alertMsResponse: HttpResponse<AlertMs>) => {
            this.alertMs = alertMsResponse.body;
        });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerChangeInAlertMs() {
        this.eventSubscriber = this.eventManager.subscribe('alertMsListModification', response => this.load(this.alertMs.id));
    }

    beforeTabChange($event: NgbTabChangeEvent) {}
}
