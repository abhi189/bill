import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { BillingCycleInvoiceActivity } from './billing-cycle-invoice-activity.model';
import { BillingCycleInvoiceActivityService } from './billing-cycle-invoice-activity.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-billing-cycle-invoice-activity',
    templateUrl: './billing-cycle-invoice-activity.component.html'
})
export class BillingCycleInvoiceActivityComponent implements OnInit, OnDestroy {
    currentAccount: any;
    billingCycleInvoiceActivities: BillingCycleInvoiceActivity[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    subscription: Subscription;
    invoiceUpdateSubcription: Subscription;
    budderflyInvoiceId: number;
    billingCycleId: number;
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

    constructor(
        private billingCycleInvoiceActivityService: BillingCycleInvoiceActivityService,
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

    loadAll(id: number) {
        if (this.currentSearch) {
            this.billingCycleInvoiceActivityService
                .search({
                    page: this.page - 1,
                    query: `budderflyInvoice.id:${id} AND ${this.currentSearch}`,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.billingCycleInvoiceActivityService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BillingCycleInvoiceActivity[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate(
            ['billing-cycle/' + this.billingCycleId + '/budderfly-invoice/' + this.budderflyInvoiceId + '/billing-cycle-invoice-activity'],
            {
                queryParams: {
                    page: this.page,
                    size: this.itemsPerPage,
                    search: this.currentSearch,
                    sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
                }
            }
        );
        this.loadAll(this.budderflyInvoiceId);
    }

    clear() {
        this.page = 0;
        this.currentSearch = '';
        this.router.navigate([
            'billing-cycle/' + this.billingCycleId + '/budderfly-invoice/' + this.budderflyInvoiceId + '/billing-cycle-invoice-activity',
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll(this.budderflyInvoiceId);
    }
    search(query) {
        if (!query) {
            return this.clear();
        }
        this.page = 0;
        this.currentSearch = query;
        this.router.navigate([
            'billing-cycle/' + this.billingCycleId + '/budderfly-invoice/' + this.budderflyInvoiceId + '/billing-cycle-invoice-activity',
            {
                search: this.currentSearch,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll(this.budderflyInvoiceId);
    }
    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(params => {
            this.budderflyInvoiceId = params['invoiceId'];
            this.billingCycleId = params['billingCycleId'];
        });

        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBillingCycleInvoiceActivities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.subscription);
        this.eventManager.destroy(this.invoiceUpdateSubcription);
    }

    trackId(index: number, item: BillingCycleInvoiceActivity) {
        return item.id;
    }
    registerChangeInBillingCycleInvoiceActivities() {
        this.invoiceUpdateSubcription = this.eventManager.subscribe('budderflyInvoiceListModification', response =>
            this.loadAll(this.budderflyInvoiceId)
        );
        this.eventSubscriber = this.eventManager.subscribe('billingCycleInvoiceActivityListModification', response =>
            this.loadAll(this.budderflyInvoiceId)
        );
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
        this.billingCycleInvoiceActivities = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
