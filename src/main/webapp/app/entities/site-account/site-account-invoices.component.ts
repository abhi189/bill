import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';
import { BILLING_SERVER_API_URL } from '../../app.constants';

import { Invoice } from '../invoice/invoice.model';

import { SiteAccountService } from './site-account.service';
import { ITEMS_PER_PAGE } from '../../shared';

@Component({
    selector: 'jhi-site-account-invoices',
    templateUrl: '../invoice/invoice.component.html'
})
export class SiteAccountInvoicesComponent implements OnInit, OnDestroy {
    public resourceUrl = BILLING_SERVER_API_URL + 'api/invoices/downloadUtilityInvoice/';
    invoices: Invoice[];
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
    siteAccountId: any;
    searchBar = false;

    constructor(
        private siteAccountService: SiteAccountService,
        private jhiAlertService: JhiAlertService,
        private parseLinks: JhiParseLinks,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.page = 1;
        this.reverse = false;
        this.predicate = 'intervalEnd';
        this.routeData = this.activatedRoute.queryParams.subscribe(data => {
            this.page = data.page || 1;
            this.getPredicateAndSortingOrder(data.sort);
        });

        this.activatedRoute.params.subscribe(params => {
            this.siteAccountId = params['id'];
        });
    }

    loadAll() {
        this.siteAccountService
            .invoices(this.siteAccountId, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<Invoice[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate([], {
            queryParams: {
                tab: 'invoice',
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([], {
            queryParams: {
                tab: 'invoice',
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.registerChangeInInvoices();
    }

    trackId(index: number, item: Invoice) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    getPredicateAndSortingOrder(string: string) {
        if (string != null) {
            const splitString = string.split(',');
            this.predicate = splitString[0];
            this.reverse = splitString[1] === 'asc';
        }
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.invoices = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerChangeInInvoices() {
        this.eventSubscriber = this.eventManager.subscribe('invoiceListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.router.navigate([], {
            queryParams: null
        });
        this.eventManager.destroy(this.eventSubscriber);
    }

    public getLink(item: Invoice) {
        if (item.budderflyRepositoryLink !== null && item.budderflyRepositoryLink !== '') {
            return this.resourceUrl + item.budderflyRepositoryLink;
        } else {
            return item.sourceLink;
        }
    }
}
