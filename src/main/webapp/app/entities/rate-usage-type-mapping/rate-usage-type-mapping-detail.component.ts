import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';
import { RateUsageTypeMappingService } from './rate-usage-type-mapping.service';

@Component({
    selector: 'jhi-rate-usage-type-mapping-detail',
    templateUrl: './rate-usage-type-mapping-detail.component.html'
})
export class RateUsageTypeMappingDetailComponent implements OnInit, OnDestroy {
    rateUsageTypeMapping: RateUsageTypeMapping;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rateUsageTypeMappingService: RateUsageTypeMappingService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInRateUsageTypeMappings();
    }

    load(id) {
        this.rateUsageTypeMappingService.find(id).subscribe((rateUsageTypeMappingResponse: HttpResponse<RateUsageTypeMapping>) => {
            this.rateUsageTypeMapping = rateUsageTypeMappingResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRateUsageTypeMappings() {
        this.eventSubscriber = this.eventManager.subscribe('rateUsageTypeMappingListModification', response =>
            this.load(this.rateUsageTypeMapping.id)
        );
    }
}
