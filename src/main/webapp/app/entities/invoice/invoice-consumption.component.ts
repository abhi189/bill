import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiParseLinks, JhiEventManager } from 'ng-jhipster';

import { ConsumptionService } from '../consumption/consumption.service';

import { ITEMS_PER_PAGE } from '../../shared';
import { Consumption } from '../consumption/consumption.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-invoice-consumption',
    templateUrl: '../consumption/consumption.component.html'
})
export class InvoiceConsumptionComponent implements OnInit, OnDestroy {
    consumptions: Consumption[];
    eventSubscriber: Subscription;
    error: any;
    success: any;
    currentSearch: string;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    invoiceId: any;

    constructor(
        private consumptionSrevice: ConsumptionService,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.page = 1;
        this.reverse = true;
        this.predicate = 'id';

        this.activatedRoute.params.subscribe(params => {
            this.invoiceId = params['id'];
        });
    }

    loadAll() {
        this.consumptionSrevice
            .query({
                'invoiceId.equals': this.invoiceId,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<Consumption[]>) => this.onSuccess(res.body, res.headers),
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
        this.loadAll();
    }

    search(query) {
        if (!query) {
            return this.clear();
        }

        this.currentSearch = query;
        this.consumptionSrevice
            .search({
                page: this.page - 1,
                query: `invoiceId:${this.invoiceId} AND ${this.currentSearch}`,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<Consumption[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInConsumptions();
    }

    trackId(index: number, item: Consumption) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    registerChangeInConsumptions() {
        this.eventSubscriber = this.eventManager.subscribe('consumptionListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.consumptions = data;
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
