import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Discount } from './discount.model';
import { DiscountService } from './discount.service';

@Injectable()
export class DiscountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private discountService: DiscountService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.discountService.find(id).subscribe((discountResponse: HttpResponse<Discount>) => {
                    const discount: Discount = discountResponse.body;
                    if (discount.startDate) {
                        discount.startDate = {
                            year: discount.startDate.getFullYear(),
                            month: discount.startDate.getMonth() + 1,
                            day: discount.startDate.getDate()
                        };
                    }
                    if (discount.endDate) {
                        discount.endDate = {
                            year: discount.endDate.getFullYear(),
                            month: discount.endDate.getMonth() + 1,
                            day: discount.endDate.getDate()
                        };
                    }
                    this.ngbModalRef = this.discountModalRef(component, discount);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.discountModalRef(component, new Discount());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    discountModalRef(component: Component, discount: Discount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.discount = discount;
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
