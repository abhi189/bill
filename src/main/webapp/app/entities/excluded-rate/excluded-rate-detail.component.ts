import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExcludedRate } from './excluded-rate.model';
import { ExcludedRateService } from './excluded-rate.service';

@Component({
    selector: 'jhi-excluded-rate-detail',
    templateUrl: './excluded-rate-detail.component.html'
})
export class ExcludedRateDetailComponent implements OnInit, OnDestroy {
    excludedRate: ExcludedRate;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private excludedRateService: ExcludedRateService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInExcludedRates();
    }

    load(id) {
        this.excludedRateService.find(id).subscribe((excludedRateResponse: HttpResponse<ExcludedRate>) => {
            this.excludedRate = excludedRateResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExcludedRates() {
        this.eventSubscriber = this.eventManager.subscribe('excludedRateListModification', response => this.load(this.excludedRate.id));
    }
}
