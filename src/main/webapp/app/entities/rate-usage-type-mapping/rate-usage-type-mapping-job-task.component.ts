import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { Principal } from '../../shared';
import { ImportMapping } from '../import-mapping';
import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';
import { RateUsageTypeMappingService } from './rate-usage-type-mapping.service';

@Component({
    selector: 'jhi-rate-usage-type-mapping-job-task',
    templateUrl: './rate-usage-type-mapping.component.html',
    styles: [
        `
            #title {
                margin-bottom: -1rem;
            }
        `
    ]
})
export class RateUsageTypeMappingJobTaskComponent implements OnInit, OnDestroy {
    currentAccount: any;
    rateUsageTypeMappings: RateUsageTypeMapping[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    extendedView = false;
    @Input() importMapping: ImportMapping;

    constructor(
        private rateUsageTypeMappingService: RateUsageTypeMappingService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = 5;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });
    }

    loadAll() {
        this.rateUsageTypeMappingService
            .getRateUsageTypeMappingsByTariffIdAndJobId({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                tariffId: this.importMapping.externalTariffId,
                jobId: this.importMapping.jobId
            })
            .subscribe(
                (res: HttpResponse<RateUsageTypeMapping[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.transition();
        }
    }

    transition() {
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/rate-usage-type-mapping',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInRateUsageTypeMappings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RateUsageTypeMapping) {
        return item.id;
    }

    registerChangeInRateUsageTypeMappings() {
        this.eventSubscriber = this.eventManager.subscribe('rateUsageTypeMappingListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.rateUsageTypeMappings = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
