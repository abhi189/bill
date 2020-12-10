import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { WorkOrder } from './work-order.model';
import { WorkOrderService } from './work-order.service';

@Component({
    selector: 'jhi-work-order-detail',
    templateUrl: './work-order-detail.component.html'
})
export class WorkOrderDetailComponent implements OnInit, OnDestroy {
    workOrder: WorkOrder;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private eventManager: JhiEventManager, private workOrderService: WorkOrderService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.subscription = this.route.params.subscribe(params => {
            this.load(params['id']);
        });
        this.registerChangeInWorkOrders();
    }

    load(id) {
        this.workOrderService.find(id).subscribe((workOrderResponse: HttpResponse<WorkOrder>) => {
            this.workOrder = workOrderResponse.body;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInWorkOrders() {
        this.eventSubscriber = this.eventManager.subscribe('workOrderListModification', response => this.load(this.workOrder.id));
    }
}
