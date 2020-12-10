import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RateComponentMapping } from './rate-component-mapping.model';
import { RateComponentMappingService } from './rate-component-mapping.service';

@Component({
    selector: 'jhi-rate-component-mapping-detail',
    templateUrl: './rate-component-mapping-detail.component.html'
})
export class RateComponentMappingDetailComponent implements OnInit, OnDestroy {
    rateComponentMapping: RateComponentMapping;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private rateComponentMappingService: RateComponentMappingService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInRateComponentMappings();
    }

    load(id) {
        this.rateComponentMappingService.find(id).subscribe((rateComponentMappingResponse: HttpResponse<RateComponentMapping>) => {
            this.rateComponentMapping = rateComponentMappingResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRateComponentMappings() {
        this.eventSubscriber = this.eventManager.subscribe('rateComponentMappingListModification', response =>
            this.load(this.rateComponentMapping.id)
        );
    }
}
