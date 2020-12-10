import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Adjustment } from './adjustment.model';
import { AdjustmentService } from './adjustment.service';

@Component({
    selector: 'jhi-adjustment-detail',
    templateUrl: './adjustment-detail.component.html'
})
export class AdjustmentDetailComponent implements OnInit, OnDestroy {
    adjustment: Adjustment;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private adjustmentService: AdjustmentService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInAdjustments();
    }

    load(id) {
        this.adjustmentService.find(id).subscribe((adjustmentResponse: HttpResponse<Adjustment>) => {
            this.adjustment = adjustmentResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAdjustments() {
        this.eventSubscriber = this.eventManager.subscribe('adjustmentListModification', response => this.load(this.adjustment.id));
    }
}
