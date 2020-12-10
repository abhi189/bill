import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiParseLinks, JhiEventManager } from 'ng-jhipster';

import { MeterService } from '../meter/meter.service';

import { ITEMS_PER_PAGE } from '../../shared';
import { Meter } from './invoice.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'jhi-invoice-meter',
    templateUrl: '../meter/meter.component.html'
})
export class InvoiceMeterComponent implements OnInit, OnDestroy {
    meters: Meter[];
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
        private meterService: MeterService,
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
        this.meterService
            .query({
                'invoiceId.equals': this.invoiceId,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<Meter[]>) => this.onSuccess(res.body, res.headers),
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
        this.meterService
            .search({
                page: this.page - 1,
                query: `invoiceId:${this.invoiceId} AND ${this.currentSearch}`,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<Meter[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.registerMeterInCharges();
    }

    trackId(index: number, item: Meter) {
        return item.id;
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
        this.meters = data;
    }

    registerMeterInCharges() {
        this.eventSubscriber = this.eventManager.subscribe('meterListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
