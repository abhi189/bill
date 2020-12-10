import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { WorkOrder, WorkOrderStatus } from './work-order.model';
import { WorkOrderService } from './work-order.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-work-order',
    templateUrl: './work-order.component.html'
})
export class WorkOrderComponent implements OnInit, OnDestroy {
    currentAccount: any;
    workOrders: WorkOrder[];
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
    defaultPredicate = 'dueDate';
    statusCriteria = 'status.equals';
    statusFilter: WorkOrderStatus = WorkOrderStatus.OPEN;
    workOrderStatusMap = Object.keys(WorkOrderStatus).map(k => ({ key: k, value: WorkOrderStatus[k as any] }));
    siteId: any;

    constructor(
        private workOrderService: WorkOrderService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;
        this.activatedRoute.queryParams.subscribe(data => {
            const queryParamsIsEmpty = Object.keys(data).length === 0;
            if (queryParamsIsEmpty) {
                this.predicate = this.defaultPredicate;
                this.reverse = true;
                this.page = 1;
            } else {
                this.statusFilter = data[this.statusCriteria];
                this.page = data.page || 1;
                this.getPredicateAndSortingOrder(data.sort);
            }
        });
    }
    getPredicateAndSortingOrder(sorting: string) {
        const splitString = sorting.split(',');
        this.predicate = splitString[0];
        this.reverse = splitString[1] === 'asc';
    }
    onSelectStatusChange(status) {
        this.transition();
    }

    loadAll() {
        this.workOrderService
            .query({
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort(),
                [this.statusCriteria]: this.statusFilter
            })
            .subscribe(
                (res: HttpResponse<WorkOrder[]>) => this.onSuccess(res.body, res.headers),
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
        this.router.navigate(['/work-order'], {
            queryParams: {
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc'),
                [this.statusCriteria]: this.statusFilter
            }
        });
        this.loadAll();
    }

    clear() {
        this.page = 0;
        this.router.navigate([
            '/work-order',
            {
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
        this.registerChangeInWorkOrders();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: WorkOrder) {
        return item.id;
    }
    registerChangeInWorkOrders() {
        this.eventSubscriber = this.eventManager.subscribe('workOrderListModification', response => this.loadAll());
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        return result;
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.workOrders = data;
        this.getSiteIds();
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
    getSiteIds() {
        this.workOrders.forEach(wo => {
            if (wo.workItems && wo.workItems.length > 0) {
                wo.siteId = wo.workItems[0].siteId;
            }
        });
    }
}
