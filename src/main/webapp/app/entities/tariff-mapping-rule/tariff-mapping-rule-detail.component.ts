import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TariffMappingRule } from './tariff-mapping-rule.model';
import { TariffMappingRuleService } from './tariff-mapping-rule.service';

@Component({
    selector: 'jhi-tariff-mapping-rule-detail',
    templateUrl: './tariff-mapping-rule-detail.component.html'
})
export class TariffMappingRuleDetailComponent implements OnInit, OnDestroy {
    tariffMappingRule: TariffMappingRule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private tariffMappingRuleService: TariffMappingRuleService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInTariffMappingRules();
    }

    load(id) {
        this.tariffMappingRuleService.find(id).subscribe((tariffMappingRuleResponse: HttpResponse<TariffMappingRule>) => {
            this.tariffMappingRule = tariffMappingRuleResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTariffMappingRules() {
        this.eventSubscriber = this.eventManager.subscribe('tariffMappingRuleListModification', response =>
            this.load(this.tariffMappingRule.id)
        );
    }
}
