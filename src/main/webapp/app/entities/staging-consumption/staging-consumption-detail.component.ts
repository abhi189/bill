import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StagingConsumption } from './staging-consumption.model';
import { StagingConsumptionService } from './staging-consumption.service';

@Component({
    selector: 'jhi-staging-consumption-detail',
    templateUrl: './staging-consumption-detail.component.html'
})
export class StagingConsumptionDetailComponent implements OnInit, OnDestroy {
    stagingConsumption: StagingConsumption;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stagingConsumptionService: StagingConsumptionService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInStagingConsumptions();
    }

    load(id) {
        this.stagingConsumptionService.find(id).subscribe((stagingConsumptionResponse: HttpResponse<StagingConsumption>) => {
            this.stagingConsumption = stagingConsumptionResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStagingConsumptions() {
        this.eventSubscriber = this.eventManager.subscribe('stagingConsumptionListModification', response =>
            this.load(this.stagingConsumption.id)
        );
    }
}
