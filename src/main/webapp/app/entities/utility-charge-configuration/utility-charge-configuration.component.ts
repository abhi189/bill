import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { UtilityChargeConfiguration } from './utility-charge-configuration.model';
import { UtilityChargeConfigurationService } from './utility-charge-configuration.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { AmeService } from '../ame/ame.service';

@Component({
    selector: 'jhi-utility-charge-configuration',
    templateUrl: './utility-charge-configuration.component.html'
})
export class UtilityChargeConfigurationComponent implements OnInit, OnDestroy {
    currentAccount: any;
    utilityChargeConfigurations: UtilityChargeConfiguration[];
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
    executeProcessEnabled: boolean;

    constructor(
        private utilityChargeConfigurationService: UtilityChargeConfigurationService,
        private ameService: AmeService,
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

        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';

        this.predicate = 'priority';
        this.reverse = false;
        this.executeProcessEnabled = true;
    }

    loadAll() {
        if (this.currentSearch) {
            this.utilityChargeConfigurationService
                .search({
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<UtilityChargeConfiguration[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.utilityChargeConfigurationService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<UtilityChargeConfiguration[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate(['/utility-charge-configuration'], {
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
            '/utility-charge-configuration',
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
            '/utility-charge-configuration',
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
        this.registerChangeInUtilityChargeConfigurations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UtilityChargeConfiguration) {
        return item.id;
    }
    registerChangeInUtilityChargeConfigurations() {
        this.eventSubscriber = this.eventManager.subscribe('utilityChargeConfigurationListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'priority') {
            result.push('priority');
        }
        return result;
    }

    executeRules() {
        this.executeProcessEnabled = false;
        this.ameService.updateDollarsCalculation().subscribe(
            (res: any) => {
                this.jhiAlertService.success('billingWebApp.utilityChargeConfiguration.executionStarted', null, null);
            },
            (res: HttpErrorResponse) => {
                this.jhiAlertService.error(res.message, null, null);
            }
        );
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.utilityChargeConfigurations = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
