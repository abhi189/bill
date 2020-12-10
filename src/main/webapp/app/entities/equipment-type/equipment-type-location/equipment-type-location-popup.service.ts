import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EquipmentTypeLocation } from './equipment-type-location.model';
import { EquipmentTypeLocationService } from './equipment-type-location.service';

@Injectable()
export class EquipmentTypeLocationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private equipmentTypeLocationService: EquipmentTypeLocationService
    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any, equipmentTypeId?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.equipmentTypeLocationService
                    .find(id)
                    .subscribe((equipmentTypeLocationResponse: HttpResponse<EquipmentTypeLocation>) => {
                        const equipmentTypeLocation: EquipmentTypeLocation = equipmentTypeLocationResponse.body;
                        this.ngbModalRef = this.equipmentTypeLocationModalRef(component, equipmentTypeLocation);
                        resolve(this.ngbModalRef);
                    });
            } else if (equipmentTypeId) {
                setTimeout(() => {
                    this.ngbModalRef = this.equipmentTypeLocationModalRef(component, new EquipmentTypeLocation(), equipmentTypeId);
                    resolve(this.ngbModalRef);
                }, 0);
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.equipmentTypeLocationModalRef(component, new EquipmentTypeLocation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    equipmentTypeLocationModalRef(
        component: Component,
        equipmentTypeLocation: EquipmentTypeLocation,
        equipmentTypeId?: number | any
    ): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.equipmentTypeLocation = equipmentTypeLocation;
        modalRef.componentInstance.equipmentTypeId = equipmentTypeId;
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
