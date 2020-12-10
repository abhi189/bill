import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { WorkOrder } from './work-order.model';
import { WorkOrderPopupService } from './work-order-popup.service';
import { WorkOrderService } from './work-order.service';

@Component({
    selector: 'jhi-work-order-dialog',
    templateUrl: './work-order-dialog.component.html'
})
export class WorkOrderDialogComponent implements OnInit {
    workOrder: WorkOrder;
    isSaving: boolean;
    estimatedCompletionDateDp: any;
    creationDateDp: any;
    dueDateDp: any;
    completionDateDp: any;

    constructor(public activeModal: NgbActiveModal, private workOrderService: WorkOrderService, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.workOrder.id !== undefined) {
            this.subscribeToSaveResponse(this.workOrderService.update(this.workOrder));
        } else {
            this.subscribeToSaveResponse(this.workOrderService.create(this.workOrder));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<WorkOrder>>) {
        result.subscribe((res: HttpResponse<WorkOrder>) => this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: WorkOrder) {
        this.eventManager.broadcast({ name: 'workOrderListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-work-order-popup',
    template: ''
})
export class WorkOrderPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private workOrderPopupService: WorkOrderPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.workOrderPopupService.open(WorkOrderDialogComponent as Component, params['id']);
            } else {
                this.workOrderPopupService.open(WorkOrderDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
