import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Consumption } from './consumption.model';
import { ConsumptionService } from './consumption.service';

@Component({
    selector: 'jhi-consumption-detail',
    templateUrl: './consumption-detail.component.html'
})
export class ConsumptionDetailComponent implements OnInit, OnDestroy {
    consumption: Consumption;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private consumptionService: ConsumptionService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInConsumptions();
    }

    load(id) {
        this.consumptionService.find(id).subscribe((consumptionResponse: HttpResponse<Consumption>) => {
            this.consumption = consumptionResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInConsumptions() {
        this.eventSubscriber = this.eventManager.subscribe('consumptionListModification', response => this.load(this.consumption.id));
    }
}
