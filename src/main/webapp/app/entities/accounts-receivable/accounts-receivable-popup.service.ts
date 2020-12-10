import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AccountsReceivable } from './accounts-receivable.model';
import { AccountsReceivableService } from './accounts-receivable.service';

@Injectable()
export class AccountsReceivablePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private accountsReceivableService: AccountsReceivableService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.accountsReceivableService.find(id).subscribe((accountsReceivableResponse: HttpResponse<AccountsReceivable>) => {
                    const accountsReceivable: AccountsReceivable = accountsReceivableResponse.body;
                    this.ngbModalRef = this.accountsReceivableModalRef(component, accountsReceivable);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.accountsReceivableModalRef(component, new AccountsReceivable());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    accountsReceivableModalRef(component: Component, accountsReceivable: AccountsReceivable): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.accountsReceivable = accountsReceivable;
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
