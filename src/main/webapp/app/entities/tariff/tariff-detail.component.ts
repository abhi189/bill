import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { Provider, Rate, Tariff, TariffYear } from './tariff.model';
import { TariffService } from './tariff.service';
import { TariffYearService } from './tariff-year.service';
import { Observable } from 'rxjs';
import { Invoice } from '../invoice';
import { forEach } from '@angular/router/src/utils/collection';
import { RateService } from './rates.service';
import { ProviderService } from './provider.service';

@Component({
    selector: 'jhi-tariff-detail',
    templateUrl: './tariff-detail.component.html',
    styles: [
        `
            .nav-background {
                color: #495057;
                background-color: #e4e5e6;
                border-color: #dee2e6 #dee2e6 #e4e5e6;
            }
        `
    ]
})
export class TariffDetailComponent implements OnInit, OnDestroy {
    tariff: Tariff;
    tariffYears: Array<TariffYear> = [];
    jobId: string;
    private subscription: Subscription;
    private eventSubscriber: Subscription;
    activeIdString: string;

    constructor(
        private eventManager: JhiEventManager,
        private tariffService: TariffService,
        private tariffYearService: TariffYearService,
        private route: ActivatedRoute,
        private rateService: RateService
    ) {}

    ngOnInit() {
        this.activeIdString = 'tabCurrentRates';
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
            if (params['jobId']) {
                this.activeIdString = 'tabImportHistory';
                this.jobId = params['jobId'];
            }
        });
        this.registerChangeInTariffs();
    }

    load(id) {
        this.tariffService.find(id).subscribe((tariffResponse: HttpResponse<Tariff>) => {
            this.tariff = tariffResponse.body;
            this.rateService.findByTariffId(this.tariff.id).subscribe((ratesResponse: HttpResponse<Rate[]>) => {
                this.tariff.rates = ratesResponse.body;
                this.orderingRatesByYears(this.tariff.rates);
            });
        });
    }

    orderingRatesByYears(rates: Array<Rate>) {
        const groups = rates.reduce(function(obj, item) {
            obj[item.year] = obj[item.year] || [];
            obj[item.year].push(item);
            return obj;
        }, {});
        this.tariffYears = Object.keys(groups)
            .map(function(key) {
                return { year: parseInt(key, 10), rates: groups[key] };
            })
            .sort(function(a, b) {
                if (a.year < b.year) {
                    return 1;
                }
                if (a.year > b.year) {
                    return -1;
                }
                // a must be equal to b
                return 0;
            });
    }

    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTariffs() {
        this.eventSubscriber = this.eventManager.subscribe('tariffListModification', response => this.load(this.tariff.id));
    }

    isManualProvider() {
        return this.tariff.providerName == null;
    }
}
