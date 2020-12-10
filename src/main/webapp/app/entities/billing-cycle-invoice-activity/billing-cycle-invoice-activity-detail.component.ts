import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { BillingCycleInvoiceActivity } from './billing-cycle-invoice-activity.model';
import { BillingCycleInvoiceActivityService } from './billing-cycle-invoice-activity.service';

@Component({
    selector: 'jhi-billing-cycle-invoice-activity-detail',
    templateUrl: './billing-cycle-invoice-activity-detail.component.html'
})
export class BillingCycleInvoiceActivityDetailComponent implements OnInit, OnDestroy {
    billingCycleInvoiceActivity: BillingCycleInvoiceActivity;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private billingCycleInvoiceActivityService: BillingCycleInvoiceActivityService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInBillingCycleInvoiceActivities();
    }

    load(id) {
        this.billingCycleInvoiceActivityService
            .find(id)
            .subscribe((billingCycleInvoiceActivityResponse: HttpResponse<BillingCycleInvoiceActivity>) => {
                this.billingCycleInvoiceActivity = billingCycleInvoiceActivityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInBillingCycleInvoiceActivities() {
        this.eventSubscriber = this.eventManager.subscribe('billingCycleInvoiceActivityListModification', response =>
            this.load(this.billingCycleInvoiceActivity.id)
        );
    }
}
