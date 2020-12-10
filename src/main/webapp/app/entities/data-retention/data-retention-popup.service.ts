import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DataRetention } from './data-retention.model';
import { DataRetentionService } from './data-retention.service';

@Injectable()
export class DataRetentionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private dataRetentionService: DataRetentionService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.dataRetentionService.find(id).subscribe((dataRetentionResponse: HttpResponse<DataRetention>) => {
                    const dataRetention: DataRetention = dataRetentionResponse.body;
                    this.ngbModalRef = this.dataRetentionModalRef(component, dataRetention);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.dataRetentionModalRef(component, new DataRetention());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    dataRetentionModalRef(component: Component, dataRetention: DataRetention): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.dataRetention = dataRetention;
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
