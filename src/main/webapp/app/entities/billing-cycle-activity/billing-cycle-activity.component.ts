import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { BillingCycleActivity } from './billing-cycle-activity.model';
import { BillingCycleActivityService } from './billing-cycle-activity.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-billing-cycle-activity',
    templateUrl: './billing-cycle-activity.component.html'
})
export class BillingCycleActivityComponent implements OnInit, OnDestroy {
    currentAccount: any;
    billingCycleActivities: BillingCycleActivity[];
    private subscription: Subscription;
    error: any;
    success: any;
    eventSubscriber: Subscription;
    eventSubscriberBillingCycle: Subscription;
    currentSearchActivity: string;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;
    billingCycleId: number;

    constructor(
        private billingCycleActivityService: BillingCycleActivityService,
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
        this.currentSearchActivity =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['searchActivity']
                ? this.activatedRoute.snapshot.params['searchActivity']
                : '';
    }

    loadAll(id: number) {
        if (this.currentSearchActivity) {
            this.billingCycleActivityService
                .search({
                    page: this.page - 1,
                    query: `billingCycle.id:${id} AND ${this.currentSearchActivity}`,
                    size: this.itemsPerPage,
                    sort: this.sort()
                })
                .subscribe(
                    (res: HttpResponse<BillingCycleActivity[]>) => this.onSuccess(res.body, res.headers),
                    (res: HttpErrorResponse) => this.onError(res.message)
                );
            return;
        }
        this.billingCycleActivityService
            .findByBillingCycleId(id, {
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<BillingCycleActivity[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate(['billing-cycle/' + this.billingCycleId], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                search: this.currentSearchActivity,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll(this.billingCycleId);
    }

    clearActivity() {
        this.page = 0;
        this.currentSearchActivity = '';
        this.router.navigate([
            'billing-cycle/' + this.billingCycleId,
            {
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll(this.billingCycleId);
    }
    searchActivity(query) {
        if (!query) {
            return this.clearActivity();
        }
        this.page = 0;
        this.currentSearchActivity = query;
        this.router.navigate([
            'billing-cycle/' + this.billingCycleId,
            {
                search: this.currentSearchActivity,
                page: this.page,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll(this.billingCycleId);
    }

    ngOnInit() {
        this.subscription = this.activatedRoute.params.subscribe(params => {
            this.loadAll(params['id']);
            this.billingCycleId = params['id'];
        });
        this.principal.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInBillingCycleActivities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
        this.eventManager.destroy(this.eventSubscriberBillingCycle);
    }

    trackId(index: number, item: BillingCycleActivity) {
        return item.id;
    }
    registerChangeInBillingCycleActivities() {
        this.eventSubscriber = this.eventManager.subscribe('billingCycleActivityListModification', response =>
            this.loadAll(this.billingCycleId)
        );
        this.eventSubscriberBillingCycle = this.eventManager.subscribe('billingCycleListModification', response =>
            this.loadAll(this.billingCycleId)
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
        this.billingCycleActivities = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
