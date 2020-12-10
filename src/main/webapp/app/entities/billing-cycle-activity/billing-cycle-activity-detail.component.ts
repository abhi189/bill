import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillingCycleActivity } from './billing-cycle-activity.model';
import { BillingCycleActivityService } from './billing-cycle-activity.service';

@Component({
    selector: 'jhi-billing-cycle-activity-detail',
    templateUrl: './billing-cycle-activity-detail.component.html'
})
export class BillingCycleActivityDetailComponent implements OnInit, OnDestroy {
    billingCycleActivity: BillingCycleActivity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billingCycleActivityService: BillingCycleActivityService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInBillingCycleActivities();
    }

    load(id) {
        this.billingCycleActivityService.find(id).subscribe((billingCycleActivityResponse: HttpResponse<BillingCycleActivity>) => {
            this.billingCycleActivity = billingCycleActivityResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBillingCycleActivities() {
        this.eventSubscriber = this.eventManager.subscribe('billingCycleActivityListModification', response =>
            this.load(this.billingCycleActivity.id)
        );
    }
}
