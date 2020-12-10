import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { SiteWorkOrderService } from './site-work-order.service';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

@Component({
    selector: 'jhi-site-work-order',
    templateUrl: './site-work-order.component.html',
    styles: []
})
export class SiteWorkOrderComponent implements OnInit, OnDestroy {
    _budderflyId: string;
    get budderflyId(): string {
        return this._budderflyId;
    }

    @Input('budderflyId')
    set budderflyId(value: string) {
        this._budderflyId = value;
        this.getWorkOrders();
    }

    eventSubscriber: Subscription;
    workOrders = [];

    constructor(private siteWorkOrderService: SiteWorkOrderService, private eventManager: JhiEventManager) {}

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    ngOnInit() {
        this.registerChangeInWorkOrders();
    }

    registerChangeInWorkOrders() {
        this.eventSubscriber = this.eventManager.subscribe('workOrderListModification', response => this.getWorkOrders());
    }

    getWorkOrders() {
        this.siteWorkOrderService.getWorkOrdersByBudderflyId(this.budderflyId).subscribe(res => (this.workOrders = res.body));
    }
}
