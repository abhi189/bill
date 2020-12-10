import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { RateUsageTypeMapping } from './rate-usage-type-mapping.model';
import { RateUsageTypeMappingService } from './rate-usage-type-mapping.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-rate-usage-type-mapping',
    templateUrl: './rate-usage-type-mapping.component.html'
})
export class RateUsageTypeMappingComponent implements OnInit, OnDestroy {
    currentAccount: any;
    rateUsageTypeMappings: RateUsageTypeMapping[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    currentSearch: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    statusCriteria = 'rateMapped';
    rateMappedFilter: any;
    extendedView = true;

    constructor(
        private rateUsageTypeMappingService: RateUsageTypeMappingService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.routeData = this.activatedRoute.data.subscribe(data => {
            this.page = data.pagingParams.page;
            this.previousPage = data.pagingParams.page;
            this.reverse = data.pagingParams.ascending;
            this.predicate = data.pagingParams.predicate;
        });

        this.routeData = this.activatedRoute.queryParams.subscribe(data => {
            const queryParamsIsEmpty = Object.keys(data).length === 0;
            if (!queryParamsIsEmpty) {
                this.rateMappedFilter = data[this.statusCriteria];
                this.page = data.page || 1;
                const splitString = data.sort.split(',');
                this.predicate = splitString[0];
                this.reverse = splitString[1] === 'asc';
            }
        });

        if (this.rateMappedFilter == null) {
            this.currentSearch =
                this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                    ? this.activatedRoute.snapshot.params['search']
                    : '';
        } else {
            this.currentSearch = '' + [this.statusCriteria] + ':' + this.rateMappedFilter;
        }
    }

    loadAll() {
        if (this.currentSearch) {
            this.rateUsageTypeMappingService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<RateUsageTypeMapping[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.rateUsageTypeMappingService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
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
        this.router.navigate(['/rate-usage-type-mapping'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearch,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            '/rate-usage-type-mapping',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/rate-usage-type-mapping',
            {
                search: this.currentSearch,
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
        // this.page = pagingParams.page;
        this.rateUsageTypeMappings = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
