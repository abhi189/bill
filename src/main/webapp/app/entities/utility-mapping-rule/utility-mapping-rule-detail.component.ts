import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UtilityMappingRule } from './utility-mapping-rule.model';
import { UtilityMappingRuleService } from './utility-mapping-rule.service';

@Component({
    selector: 'jhi-utility-mapping-rule-detail',
    templateUrl: './utility-mapping-rule-detail.component.html'
})
export class UtilityMappingRuleDetailComponent implements OnInit, OnDestroy {
    utilityMappingRule: UtilityMappingRule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private utilityMappingRuleService: UtilityMappingRuleService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInUtilityMappingRules();
    }

    load(id) {
        this.utilityMappingRuleService.find(id).subscribe((utilityMappingRuleResponse: HttpResponse<UtilityMappingRule>) => {
            this.utilityMappingRule = utilityMappingRuleResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUtilityMappingRules() {
        this.eventSubscriber = this.eventManager.subscribe('utilityMappingRuleListModification', response =>
            this.load(this.utilityMappingRule.id)
        );
    }
}
