import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { RateComponentMapping } from './rate-component-mapping.model';
import { RateComponentMappingService } from './rate-component-mapping.service';

@Injectable()
export class RateComponentMappingPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private rateComponentMappingService: RateComponentMappingService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.rateComponentMappingService.find(id).subscribe((rateComponentMappingResponse: HttpResponse<RateComponentMapping>) => {
                    const rateComponentMapping: RateComponentMapping = rateComponentMappingResponse.body;
                    this.ngbModalRef = this.rateComponentMappingModalRef(component, rateComponentMapping);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.rateComponentMappingModalRef(component, new RateComponentMapping());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    rateComponentMappingModalRef(component: Component, rateComponentMapping: RateComponentMapping): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.rateComponentMapping = rateComponentMapping;
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
