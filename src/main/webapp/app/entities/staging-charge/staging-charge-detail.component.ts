import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StagingCharge } from './staging-charge.model';
import { StagingChargeService } from './staging-charge.service';

@Component({
    selector: 'jhi-staging-charge-detail',
    templateUrl: './staging-charge-detail.component.html'
})
export class StagingChargeDetailComponent implements OnInit, OnDestroy {
    stagingCharge: StagingCharge;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private stagingChargeService: StagingChargeService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInStagingCharges();
    }

    load(id) {
        this.stagingChargeService.find(id).subscribe((stagingChargeResponse: HttpResponse<StagingCharge>) => {
            this.stagingCharge = stagingChargeResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStagingCharges() {
        this.eventSubscriber = this.eventManager.subscribe('stagingChargeListModification', response => this.load(this.stagingCharge.id));
    }
}
