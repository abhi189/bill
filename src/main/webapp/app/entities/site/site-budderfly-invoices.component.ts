import { Component, OnInit, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { JhiAlertService, JhiParseLinks } from 'ng-jhipster';

import { BudderflyInvoice } from '../budderfly-invoice/budderfly-invoice.model';
import { BudderflyInvoiceService } from '../budderfly-invoice/budderfly-invoice.service';

import { ITEMS_PER_PAGE } from '../../shared';

@Component({
    selector: 'jhi-site-budderfly-invoice',
    templateUrl: '../budderfly-invoice/budderfly-invoice.component.html'
})
export class SiteBudderflyInvoicesComponent implements OnInit {
    @Input() budderflyId: string;
    budderflyInvoices: BudderflyInvoice[];
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
    siteId: any;
    external = true;

    constructor(
        private invoiceService: BudderflyInvoiceService,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.page = 1;
        this.reverse = true;
        this.predicate = 'id';

        this.activatedRoute.params.subscribe(params => {
            this.siteId = params['id'];
        });
    }

    loadAll() {
        this.invoiceService
            .getByBudderflyId(this.budderflyId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BudderflyInvoice[]>) => this.onSuccess(res.body, res.headers),
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
        this.invoiceService
            .search({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BudderflyInvoice[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
    }

    trackId(index: number, item: BudderflyInvoice) {
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
        this.budderflyInvoices = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
