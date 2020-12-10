import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RateChargeMapping } from './rate-charge-mapping.model';
import { RateChargeMappingService } from './rate-charge-mapping.service';
import { InvoiceSectionEnum } from '../tariff';

@Component({
    selector: 'jhi-rate-charge-mapping-detail',
    templateUrl: './rate-charge-mapping-detail.component.html'
})
export class RateChargeMappingDetailComponent implements OnInit, OnDestroy {
    rateChargeMapping: RateChargeMapping;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    InvoiceSectionEnum = InvoiceSectionEnum;
    invoiceSectionsMap = Object.keys(InvoiceSectionEnum).map(k => ({ key: k, value: InvoiceSectionEnum[k as any] }));

    constructor(
        private eventManager: JhiEventManager,
        private rateChargeMappingService: RateChargeMappingService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInRateChargeMappings();
    }

    load(id) {
        this.rateChargeMappingService.find(id).subscribe((rateChargeMappingResponse: HttpResponse<RateChargeMapping>) => {
            this.rateChargeMapping = rateChargeMappingResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRateChargeMappings() {
        this.eventSubscriber = this.eventManager.subscribe('rateChargeMappingListModification', response =>
            this.load(this.rateChargeMapping.id)
        );
    }
}
