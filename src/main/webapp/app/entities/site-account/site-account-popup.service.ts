import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { SiteAccount } from './site-account.model';
import { SiteAccountService } from './site-account.service';

@Injectable()
export class SiteAccountPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private siteAccountService: SiteAccountService
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
                this.siteAccountService.find(id).subscribe((siteAccountResponse: HttpResponse<SiteAccount>) => {
                    const siteAccount: SiteAccount = siteAccountResponse.body;

                    siteAccount.liveDate = this.datePipe.transform(siteAccount.liveDate, 'yyyy-MM-ddTHH:mm:ss');
                    siteAccount.createdDate = this.datePipe.transform(siteAccount.createdDate, 'yyyy-MM-ddTHH:mm:ss');
                    siteAccount.lastModified = this.datePipe.transform(siteAccount.lastModified, 'yyyy-MM-ddTHH:mm:ss');
                    siteAccount.requestedDate = this.datePipe.transform(siteAccount.requestedDate, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.siteAccountModalRef(component, siteAccount);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.siteAccountModalRef(component, new SiteAccount());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    siteAccountModalRef(component: Component, siteAccount: SiteAccount): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.siteAccount = siteAccount;
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
