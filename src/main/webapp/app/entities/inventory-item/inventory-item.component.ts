import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { InventoryItem } from './inventory-item.model';
import { InventoryItemService } from './inventory-item.service';
import { ITEMS_PER_PAGE, Principal } from '../../shared';
import { SiteService } from '../site';

@Component({
    selector: 'jhi-inventory-item',
    templateUrl: './inventory-item.component.html'
})
export class InventoryItemComponent implements OnInit, OnDestroy {
    currentAccount: any;
    inventoryItems: InventoryItem[];
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
    siteId: number;
    bfid: string;
    itemDetails: boolean;

    constructor(
        private inventoryItemService: InventoryItemService,
        private siteService: SiteService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {
        this.itemsPerPage = ITEMS_PER_PAGE;

        this.page = 1;
        this.reverse = false;
        this.predicate = 'installDate';
        this.routeData = this.activatedRoute.queryParams.subscribe(data => {
            this.page = data.page || 1;
        });

        this.activatedRoute.params.subscribe(params => {
            this.siteId = params['id'];
            if (params['inventoryItemId']) {
                this.itemDetails = true;
                this.loadInventoryDetails(params['inventoryItemId']);
            }
        });

        this.bfid = this.siteService.budderflyId;
    }

    loadInventoryDetails(id) {
        this.siteService.findInventory(id).subscribe(res => {
            console.log('response: ', res);
        });
    }

    loadAll() {
        this.inventoryItemService
            .query({
                'budderflyId.equals': this.bfid,
                page: this.page - 1,
                size: this.itemsPerPage,
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<InventoryItem[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
    ngOnInit() {
        this.loadAll();
        this.registerChangeInInventory();
    }

    registerChangeInInventory() {
        this.eventSubscriber = this.eventManager.subscribe('inventoryItemListModification', response => this.loadAll());
    }

    ngOnDestroy() {
        this.router.navigate([], {
            queryParams: null
        });
        this.eventManager.destroy(this.eventSubscriber);
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
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
                tab: 'inventory-item',
                page: this.page,
                size: this.itemsPerPage,
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        });
        this.loadAll();
    }

    private onSuccess(data, headers) {
        this.links = this.parseLinks.parse(headers.get('link'));
        this.totalItems = headers.get('X-Total-Count');
        this.queryCount = this.totalItems;
        this.inventoryItems = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
