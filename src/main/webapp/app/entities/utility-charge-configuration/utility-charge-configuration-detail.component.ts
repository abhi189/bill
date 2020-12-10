import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UtilityChargeConfiguration } from './utility-charge-configuration.model';
import { UtilityChargeConfigurationService } from './utility-charge-configuration.service';

@Component({
    selector: 'jhi-utility-charge-configuration-detail',
    templateUrl: './utility-charge-configuration-detail.component.html'
})
export class UtilityChargeConfigurationDetailComponent implements OnInit, OnDestroy {
    utilityChargeConfiguration: UtilityChargeConfiguration;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private utilityChargeConfigurationService: UtilityChargeConfigurationService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInUtilityChargeConfigurations();
    }

    load(id) {
        this.utilityChargeConfigurationService
            .find(id)
            .subscribe((utilityChargeConfigurationResponse: HttpResponse<UtilityChargeConfiguration>) => {
                this.utilityChargeConfiguration = utilityChargeConfigurationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUtilityChargeConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('utilityChargeConfigurationListModification', response =>
            this.load(this.utilityChargeConfiguration.id)
        );
    }
}
