import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkOrder } from './work-order.model';
import { WorkOrderPopupService } from './work-order-popup.service';
import { WorkOrderService } from './work-order.service';

@Component({
    selector: 'jhi-work-order-delete-dialog',
    templateUrl: './work-order-delete-dialog.component.html'
})
export class WorkOrderDeleteDialogComponent {
    workOrder: WorkOrder;

    constructor(private workOrderService: WorkOrderService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.workOrderService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'workOrderListModification',
                content: 'Deleted an workOrder'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-work-order-delete-popup',
    template: ''
})
export class WorkOrderDeletePopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private workOrderPopupService: WorkOrderPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            this.workOrderPopupService.open(WorkOrderDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
