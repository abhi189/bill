import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WorkOrder } from './work-order.model';
import { WorkOrderService } from './work-order.service';

@Injectable()
export class WorkOrderPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private workOrderService: WorkOrderService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.workOrderService.find(id).subscribe((workOrderResponse: HttpResponse<WorkOrder>) => {
                    const workOrder: WorkOrder = workOrderResponse.body;
                    workOrder.scheduledDateAndTime = this.datePipe.transform(workOrder.scheduledDateAndTime, 'yyyy-MM-ddTHH:mm:ss');
                    if (workOrder.estimatedCompletionDate) {
                        workOrder.estimatedCompletionDate = {
                            year: workOrder.estimatedCompletionDate.getFullYear(),
                            month: workOrder.estimatedCompletionDate.getMonth() + 1,
                            day: workOrder.estimatedCompletionDate.getDate()
                        };
                    }
                    if (workOrder.creationDate) {
                        workOrder.creationDate = {
                            year: workOrder.creationDate.getFullYear(),
                            month: workOrder.creationDate.getMonth() + 1,
                            day: workOrder.creationDate.getDate()
                        };
                    }
                    if (workOrder.dueDate) {
                        workOrder.dueDate = {
                            year: workOrder.dueDate.getFullYear(),
                            month: workOrder.dueDate.getMonth() + 1,
                            day: workOrder.dueDate.getDate()
                        };
                    }
                    if (workOrder.completionDate) {
                        workOrder.completionDate = {
                            year: workOrder.completionDate.getFullYear(),
                            month: workOrder.completionDate.getMonth() + 1,
                            day: workOrder.completionDate.getDate()
                        };
                    }
                    workOrder.createdDate = this.datePipe.transform(workOrder.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    workOrder.lastModifiedDate = this.datePipe.transform(workOrder.lastModifiedDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.workOrderModalRef(component, workOrder);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.workOrderModalRef(component, new WorkOrder());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    workOrderModalRef(component: Component, workOrder: WorkOrder): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.workOrder = workOrder;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
