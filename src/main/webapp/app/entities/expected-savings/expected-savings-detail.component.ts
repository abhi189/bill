import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { ExpectedSavings } from './expected-savings.model';
import { ExpectedSavingsService } from './expected-savings.service';

@Component({
    selector: 'jhi-expected-savings-detail',
    templateUrl: './expected-savings-detail.component.html'
})
export class ExpectedSavingsDetailComponent implements OnInit, OnDestroy {
    expectedSavings: ExpectedSavings;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private expectedSavingsService: ExpectedSavingsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInExpectedSavings();
    }

    load(id) {
        this.expectedSavingsService.find(id).subscribe((expectedSavingsResponse: HttpResponse<ExpectedSavings>) => {
            this.expectedSavings = expectedSavingsResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInExpectedSavings() {
        this.eventSubscriber = this.eventManager.subscribe('expectedSavingsListModification', response =>
            this.load(this.expectedSavings.id)
        );
    }
}
