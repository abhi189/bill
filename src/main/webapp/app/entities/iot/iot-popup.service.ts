import { Router } from '@angular/router';
import { IotService } from './iot.service';
import { KittedItem } from './kitted-item.model';
import { HttpResponse } from '@angular/common/http';
import { Injectable, Component } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class IotPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private iotService: IotService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.iotService.find(id).subscribe((kittedItemResponse: HttpResponse<KittedItem>) => {
                    const kittedItem: KittedItem = kittedItemResponse.body;
                    this.ngbModalRef = this.kittedItemModalRef(component, kittedItem);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.kittedItemModalRef(component, new KittedItem());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    kittedItemModalRef(component: Component, kittedItem: KittedItem): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.kittedItem = kittedItem;
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
