import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { EquipmentType } from './equipment-type.model';
import { EquipmentTypeService } from './equipment-type.service';

@Injectable()
export class EquipmentTypePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private equipmentTypeService: EquipmentTypeService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.equipmentTypeService.find(id).subscribe((equipmentTypeResponse: HttpResponse<EquipmentType>) => {
                    const equipmentType: EquipmentType = equipmentTypeResponse.body;
                    this.ngbModalRef = this.equipmentTypeModalRef(component, equipmentType);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.equipmentTypeModalRef(component, new EquipmentType());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    equipmentTypeModalRef(component: Component, equipmentType: EquipmentType): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.equipmentType = equipmentType;
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
