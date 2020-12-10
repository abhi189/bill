import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';

import { TariffVersionHistory } from './tariff-version-history.model';
import { TariffVersionHistoryService } from './tariff-version-history.service';
import { ITEMS_PER_PAGE, Principal } from '../../../shared';

@Component({
    selector: 'jhi-tariff-version-history',
    templateUrl: './tariff-version-history.component.html'
})
export class TariffVersionHistoryComponent implements OnInit, OnDestroy {
    @Input() tariffId: number;
    currentAccount: any;
    tariffVersionHistories: TariffVersionHistory[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    defaultSorting = ['effectiveDate,desc'];

    constructor(
        private tariffVersionHistoryService: TariffVersionHistoryService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
    }

    loadAll() {
        this.tariffVersionHistoryService
            .query({
                'tariffId.equals': this.tariffId,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<TariffVersionHistory[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    loadPage(page: number) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadAll();
        }
    }

    ngOnInit() {
        this.page = 0;
        this.predicate = 'effectiveDate';
        this.previousPage = 0;
        this.loadAll();
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTariffVersionHistories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TariffVersionHistory) {
        return item.id;
    }

    registerChangeInTariffVersionHistories() {
        this.eventSubscriber = this.eventManager.subscribe('tariffVersionHistoryListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'effectiveDate') {
            result.push('effectiveDate');
        }
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.tariffVersionHistories = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    transition() {
        this.loadAll();
    }
}
