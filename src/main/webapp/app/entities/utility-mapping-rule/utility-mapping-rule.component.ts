import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { UtilityMappingRule } from './utility-mapping-rule.model';
import { UtilityMappingRuleService } from './utility-mapping-rule.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-utility-mapping-rule',
    templateUrl: './utility-mapping-rule.component.html'
})
export class UtilityMappingRuleComponent implements OnInit, OnDestroy {
    currentAccount: any;
    utilityMappingRules: UtilityMappingRule[];
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
    extendedView = true;
    disableEdit = false;
    constructor(
        private utilityMappingRuleService: UtilityMappingRuleService,
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
    }

    loadAll() {
        this.searchUtilityMappingRules();
    }

    onChangeFilter() {
        this.searchUtilityMappingRules();
    }

    searchUtilityMappingRules() {
        const chkMissingNetsuite = <HTMLInputElement>document.getElementById('missingNetsuiteUtilityMappings');
        const chkFilterEmpty = <HTMLInputElement>document.getElementById('filterEmptyBdUtilityProviderKey');
        if (this.currentSearch) {
            this.utilityMappingRuleService
                .search({
                    filterNull: chkFilterEmpty === null ? false : chkFilterEmpty.checked,
                    missingNetsuite: chkMissingNetsuite === null ? false : chkMissingNetsuite.checked,
                    page: this.page - 1,
                    query: this.currentSearch,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<UtilityMappingRule[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.utilityMappingRuleService
            .query({
                filterNull: chkFilterEmpty === null ? false : chkFilterEmpty.checked,
                missingNetsuite: chkMissingNetsuite === null ? false : chkMissingNetsuite.checked,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<UtilityMappingRule[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate(['/utility-mapping-rule'], {
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
            '/utility-mapping-rule',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }
    search(query) {
        const chkMissingNetsuite = <HTMLInputElement>document.getElementById('missingNetsuiteUtilityMappings');
        const chkFilterEmpty = <HTMLInputElement>document.getElementById('filterEmptyBdUtilityProviderKey');
        chkMissingNetsuite.checked = false;
        chkFilterEmpty.checked = false;
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            '/utility-mapping-rule',
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
        this.registerChangeInUtilityMappingRules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UtilityMappingRule) {
        return item.id;
    }
    registerChangeInUtilityMappingRules() {
        this.eventSubscriber = this.eventManager.subscribe('utilityMappingRuleListModification', response => this.loadAll());
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
        this.utilityMappingRules = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
