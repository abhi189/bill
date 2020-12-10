import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UtilityChargeConfiguration } from './utility-charge-configuration.model';
import { UtilityChargeConfigurationService } from './utility-charge-configuration.service';

@Injectable()
export class UtilityChargeConfigurationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private utilityChargeConfigurationService: UtilityChargeConfigurationService
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
                this.utilityChargeConfigurationService
                    .find(id)
                    .subscribe((utilityChargeConfigurationResponse: HttpResponse<UtilityChargeConfiguration>) => {
                        const utilityChargeConfiguration: UtilityChargeConfiguration = utilityChargeConfigurationResponse.body;
                        this.ngbModalRef = this.utilityChargeConfigurationModalRef(component, utilityChargeConfiguration);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.utilityChargeConfigurationModalRef(component, new UtilityChargeConfiguration());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    utilityChargeConfigurationModalRef(component: Component, utilityChargeConfiguration: UtilityChargeConfiguration): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.utilityChargeConfiguration = utilityChargeConfiguration;
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
