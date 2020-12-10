import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Site, SiteDiscount } from './site.model';
import { SiteService } from './site.service';

@Injectable()
export class SiteDiscountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private siteService: SiteService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.siteService.findSiteDiscount(id).subscribe((siteDiscountResponse: HttpResponse<Site>) => {
                    const siteDiscount: SiteDiscount = siteDiscountResponse.body;
                    this.ngbModalRef = this.siteDiscountModalRef(component, siteDiscount);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.siteDiscountModalRef(component, new SiteDiscount());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    siteDiscountModalRef(component: Component, siteDiscount: SiteDiscount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.siteDiscount = siteDiscount;
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
