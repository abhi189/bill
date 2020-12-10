import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Provider } from './provider.model';
import { ProviderService } from './provider.service';

@Component({
    selector: 'jhi-provider-detail',
    templateUrl: './provider-detail.component.html'
})
export class ProviderDetailComponent implements OnInit, OnDestroy {
    provider: Provider;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private providerService: ProviderService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInProviders();
    }

    load(id) {
        this.providerService.find(id).subscribe((providerResponse: HttpResponse<Provider>) => {
            this.provider = providerResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInProviders() {
        this.eventSubscriber = this.eventManager.subscribe('providerListModification', response => this.load(this.provider.id));
    }
}
