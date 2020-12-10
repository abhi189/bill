import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AmuConfiguration } from './amu-configuration.model';
import { AmuConfigurationService } from './amu-configuration.service';

@Injectable()
export class AmuConfigurationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private amuConfigurationService: AmuConfigurationService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.amuConfigurationService.find(id).subscribe((amuConfigurationResponse: HttpResponse<AmuConfiguration>) => {
                    const amuConfiguration: AmuConfiguration = amuConfigurationResponse.body;
                    this.ngbModalRef = this.amuConfigurationModalRef(component, amuConfiguration);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.amuConfigurationModalRef(component, new AmuConfiguration());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    amuConfigurationModalRef(component: Component, amuConfiguration: AmuConfiguration): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.amuConfiguration = amuConfiguration;
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
