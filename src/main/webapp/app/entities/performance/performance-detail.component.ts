import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Performance } from './performance.model';
import { PerformanceService } from './performance.service';

@Component({
    selector: 'jhi-performance-detail',
    templateUrl: './performance-detail.component.html'
})
export class PerformanceDetailComponent implements OnInit, OnDestroy {
    performance: Performance;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private performanceService: PerformanceService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInPerformances();
    }

    load(id) {
        this.performanceService.find(id).subscribe((performanceResponse: HttpResponse<Performance>) => {
            this.performance = performanceResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPerformances() {
        this.eventSubscriber = this.eventManager.subscribe('performanceListModification', response => this.load(this.performance.id));
    }
}
