import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WebhookEventLogger } from './webhook-event-logger.model';
import { WebhookEventLoggerService } from './webhook-event-logger.service';

@Injectable()
export class WebhookEventLoggerPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private webhookEventLoggerService: WebhookEventLoggerService
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
                this.webhookEventLoggerService.find(id).subscribe((webhookEventLoggerResponse: HttpResponse<WebhookEventLogger>) => {
                    const webhookEventLogger: WebhookEventLogger = webhookEventLoggerResponse.body;
                    webhookEventLogger.eventDate = this.datePipe.transform(webhookEventLogger.eventDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.webhookEventLoggerModalRef(component, webhookEventLogger);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.webhookEventLoggerModalRef(component, new WebhookEventLogger());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    webhookEventLoggerModalRef(component: Component, webhookEventLogger: WebhookEventLogger): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.webhookEventLogger = webhookEventLogger;
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
